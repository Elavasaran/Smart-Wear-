
CREATE OR REPLACE FUNCTION public.increment_promo_usage(promo_code TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.promo_codes 
  SET usage_count = usage_count + 1
  WHERE code = promo_code 
    AND is_active = true
    AND (usage_limit IS NULL OR usage_count < usage_limit);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
