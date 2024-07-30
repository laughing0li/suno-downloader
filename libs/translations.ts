import config from '@/config'
import { useTranslations } from 'next-intl';

export function useTranslatedConfig() {
    const t = useTranslations('stripe');

    function translateValue(value: string, params?: Record<string, any>) {
        return typeof value === 'string' && value.includes('.') ? t(value) : value;
    }

    function translatePlan(plan: typeof config.stripe.plans[0]) {
        return {
            ...plan,
            name: translateValue(plan.name),
            description: translateValue(plan.description),
            features: plan.features.map(feature => ({
                ...feature,
                name: translateValue(feature.name)
            }))
        };
    }

    return {
        stripe: {
            ...config.stripe,
            plans: config.stripe.plans.map(translatePlan)
        }
    };
}