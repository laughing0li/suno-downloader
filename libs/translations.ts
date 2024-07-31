import config from '@/config'
import { useTranslations } from 'next-intl';

export function useTranslatedConfig() {
    const t = useTranslations('stripe');

    function translatePlan(plan: typeof config.stripe.plans[0]) {
        return {
            ...plan,
            name: t(`${plan.name}.name`),
            description: t(`${plan.name}.description`),
            features: plan.features.map(feature => ({
                name: t(`${plan.name}.features.${feature.name}`)
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