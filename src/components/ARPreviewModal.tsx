import { useState, useRef, useEffect, useCallback } from 'react';
import { X, Camera, CameraOff, ShoppingBag, RotateCcw, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ARPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    colors: string[];
  };
  selectedColor: string;
  selectedSize: string;
  onAddToCart: () => void;
}

const ARPreviewModal = ({
  isOpen,
  onClose,
  product,
  selectedColor,
  selectedSize,
  onAddToCart,
}: ARPreviewModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [overlayPosition, setOverlayPosition] = useState({ x: 50, y: 40 });
  const [overlayScale, setOverlayScale] = useState(1);
  const [isCapturing, setIsCapturing] = useState(false);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setCameraError(null);

    try {
      // Check if camera is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Camera error:', error);
      setIsLoading(false);

      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          setCameraError(
            'Camera access denied. Please allow camera access in your browser settings to use AR Preview.'
          );
        } else if (error.name === 'NotFoundError') {
          setCameraError(
            'No camera found on this device. AR Preview requires a camera.'
          );
        } else {
          setCameraError(
            'AR Preview is not supported on this device. Please use a mobile device with camera access.'
          );
        }
      } else {
        setCameraError(
          'AR Preview is not supported on this device. Please use a mobile device with camera access.'
        );
      }
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera]);

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const handleAddToCartFromAR = () => {
    onAddToCart();
    handleClose();
  };

  const resetOverlay = () => {
    setOverlayPosition({ x: 50, y: 40 });
    setOverlayScale(1);
  };

  const adjustScale = (delta: number) => {
    setOverlayScale((prev) => Math.max(0.5, Math.min(2, prev + delta)));
  };

  // Get color filter for the overlay based on selected color
  const getColorFilter = (color: string) => {
    const colorMap: Record<string, string> = {
      Black: 'brightness(0.3)',
      White: 'brightness(1.3) saturate(0)',
      Navy: 'hue-rotate(220deg) saturate(1.5)',
      Blue: 'hue-rotate(200deg) saturate(1.2)',
      Red: 'hue-rotate(0deg) saturate(1.5)',
      Green: 'hue-rotate(100deg) saturate(1.2)',
      Grey: 'saturate(0) brightness(0.8)',
      Gray: 'saturate(0) brightness(0.8)',
      Brown: 'hue-rotate(30deg) saturate(0.8) brightness(0.7)',
      Beige: 'sepia(0.3) brightness(1.1)',
      Pink: 'hue-rotate(320deg) saturate(1.2)',
      Yellow: 'hue-rotate(50deg) saturate(1.3)',
      Orange: 'hue-rotate(30deg) saturate(1.3)',
      Purple: 'hue-rotate(270deg) saturate(1.2)',
    };
    return colorMap[color] || 'none';
  };

  const captureScreenshot = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !containerRef.current) return;

    setIsCapturing(true);
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');

      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the mirrored video frame
      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();

      // Draw the product overlay
      const overlayImg = new Image();
      overlayImg.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        overlayImg.onload = () => resolve();
        overlayImg.onerror = () => reject(new Error('Failed to load product image'));
        overlayImg.src = product.image;
      });

      // Calculate overlay position and size
      const overlayWidth = canvas.width * 0.6 * overlayScale;
      const overlayHeight = (overlayImg.height / overlayImg.width) * overlayWidth;
      const overlayX = (canvas.width * overlayPosition.x / 100) - (overlayWidth / 2);
      const overlayY = (canvas.height * overlayPosition.y / 100) - (overlayHeight / 2);

      // Apply color filter by drawing to a temporary canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = overlayWidth;
      tempCanvas.height = overlayHeight;
      const tempCtx = tempCanvas.getContext('2d');
      
      if (tempCtx) {
        tempCtx.filter = getColorFilter(selectedColor);
        tempCtx.globalAlpha = 0.85;
        tempCtx.drawImage(overlayImg, 0, 0, overlayWidth, overlayHeight);
        
        // Draw the filtered overlay onto main canvas (mirrored)
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(tempCanvas, -(overlayX + overlayWidth), overlayY);
        ctx.restore();
      }

      // Convert to blob and create download
      canvas.toBlob((blob) => {
        if (!blob) {
          toast({
            title: "Capture Failed",
            description: "Could not capture the screenshot. Please try again.",
            variant: "destructive",
          });
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `E-GentleFit-TryOn-${product.name.replace(/\s+/g, '-')}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);

        toast({
          title: "Screenshot Saved!",
          description: "Your virtual try-on image has been downloaded.",
        });
      }, 'image/png');

    } catch (error) {
      console.error('Screenshot error:', error);
      toast({
        title: "Capture Failed",
        description: "Could not capture the screenshot. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  }, [product.image, product.name, overlayPosition, overlayScale, selectedColor, toast, getColorFilter]);

  const shareScreenshot = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.save();
      ctx.scale(-1, 1);
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
      ctx.restore();

      const overlayImg = new Image();
      overlayImg.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        overlayImg.onload = () => resolve();
        overlayImg.onerror = () => reject(new Error('Failed to load product image'));
        overlayImg.src = product.image;
      });

      const overlayWidth = canvas.width * 0.6 * overlayScale;
      const overlayHeight = (overlayImg.height / overlayImg.width) * overlayWidth;
      const overlayX = (canvas.width * overlayPosition.x / 100) - (overlayWidth / 2);
      const overlayY = (canvas.height * overlayPosition.y / 100) - (overlayHeight / 2);

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = overlayWidth;
      tempCanvas.height = overlayHeight;
      const tempCtx = tempCanvas.getContext('2d');
      
      if (tempCtx) {
        tempCtx.filter = getColorFilter(selectedColor);
        tempCtx.globalAlpha = 0.85;
        tempCtx.drawImage(overlayImg, 0, 0, overlayWidth, overlayHeight);
        
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(tempCanvas, -(overlayX + overlayWidth), overlayY);
        ctx.restore();
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast({
            title: "Share Failed",
            description: "Could not capture the screenshot for sharing.",
            variant: "destructive",
          });
          return;
        }

        const file = new File([blob], `E-GentleFit-TryOn.png`, { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: `Check out this ${product.name} from E-GentleFit!`,
              text: `I just tried on the ${product.name} using E-GentleFit's AR Preview! What do you think?`,
              files: [file],
            });
            toast({
              title: "Shared Successfully!",
              description: "Your virtual try-on image has been shared.",
            });
          } catch (shareError) {
            if ((shareError as Error).name !== 'AbortError') {
              // Fallback to download if share is cancelled or fails
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.download = `E-GentleFit-TryOn-${product.name.replace(/\s+/g, '-')}.png`;
              link.href = url;
              link.click();
              URL.revokeObjectURL(url);
              toast({
                title: "Screenshot Saved!",
                description: "Sharing not available. Image has been downloaded instead.",
              });
            }
          }
        } else {
          // Fallback for browsers that don't support sharing
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `E-GentleFit-TryOn-${product.name.replace(/\s+/g, '-')}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
          toast({
            title: "Screenshot Saved!",
            description: "Sharing not available on this device. Image has been downloaded.",
          });
        }
      }, 'image/png');

    } catch (error) {
      console.error('Share error:', error);
      toast({
        title: "Share Failed",
        description: "Could not share the screenshot. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCapturing(false);
    }
  }, [product.image, product.name, overlayPosition, overlayScale, selectedColor, toast, getColorFilter]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] p-0 bg-background border-border overflow-hidden">
        <DialogHeader className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-background/90 to-transparent">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Try Before Buy - AR Preview
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="rounded-full bg-background/50 hover:bg-background/80"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div ref={containerRef} className="relative w-full h-full bg-secondary">
          {/* Hidden canvas for screenshot capture */}
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Camera Feed */}
          {!cameraError && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover scale-x-[-1]"
            />
          )}

          {/* Loading State */}
          {isLoading && !cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-secondary">
              <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground">Starting camera...</p>
            </div>
          )}

          {/* Error State */}
          {cameraError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-secondary">
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                <CameraOff className="w-10 h-10 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Camera Not Available</h3>
              <p className="text-muted-foreground max-w-md mb-6">{cameraError}</p>
              <div className="flex gap-3">
                <Button onClick={startCamera} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={handleClose}>Close</Button>
              </div>
            </div>
          )}

          {/* AR Overlay - Product Image */}
          {!cameraError && !isLoading && (
            <div
              className="absolute pointer-events-none"
              style={{
                left: `${overlayPosition.x}%`,
                top: `${overlayPosition.y}%`,
                transform: `translate(-50%, -50%) scale(${overlayScale}) scaleX(-1)`,
                width: '60%',
                maxWidth: '400px',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto opacity-85 drop-shadow-2xl"
                style={{
                  filter: getColorFilter(selectedColor),
                  mixBlendMode: 'multiply',
                }}
              />
            </div>
          )}

          {/* Product Info Overlay */}
          {!cameraError && !isLoading && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 via-background/80 to-transparent">
              <div className="max-w-md mx-auto space-y-4">
                {/* Product Details */}
                <div className="flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-xl p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedSize && `Size: ${selectedSize}`}
                      {selectedSize && selectedColor && ' • '}
                      {selectedColor && `Color: ${selectedColor}`}
                    </p>
                    <p className="text-accent font-bold">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between gap-3">
                  {/* Scale Controls */}
                  <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-lg p-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => adjustScale(-0.1)}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="text-sm w-12 text-center">
                      {Math.round(overlayScale * 100)}%
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => adjustScale(0.1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={resetOverlay}
                      className="h-8 w-8 p-0"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Capture & Share Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={captureScreenshot}
                      disabled={isCapturing}
                      className="h-10 w-10 p-0 bg-card/80 backdrop-blur-sm border-border"
                      title="Save Screenshot"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={shareScreenshot}
                      disabled={isCapturing}
                      className="h-10 w-10 p-0 bg-card/80 backdrop-blur-sm border-border"
                      title="Share Screenshot"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={handleAddToCartFromAR}
                    className="flex-1 bg-gradient-gold text-primary hover:shadow-gold font-semibold"
                    disabled={!selectedSize || !selectedColor}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                {(!selectedSize || !selectedColor) && (
                  <p className="text-center text-sm text-muted-foreground">
                    Please select size and color before adding to cart
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Camera indicator */}
          {!cameraError && !isLoading && (
            <div className="absolute top-20 left-4 flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-3 py-1.5">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium">Live Camera</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ARPreviewModal;
