import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import CountriesView from "@/views/CountriesView.vue";
import CountryDetailView from "@/views/CountryDetailView.vue";
import CurrencyConverterView from "@/views/CurrencyConverterView.vue";

const router=createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      meta: {
        title: "Dashboard",
      },
    },
    {
      path: "/countries",
      name: "countries",
      component: CountriesView,
      meta: {
        title: "Countries",
      },
    },
    {
      path: "/country/:code",
      name: "country-detail",
      component: CountryDetailView,
      meta: {
        title: "Country Detail",
      },
    },
    {
      path: "/converter",
      name: "currency-converter",
      component: CurrencyConverterView,
      meta: {
        title: "Currency Converter",
      },
    },
  ],
});

router.afterEach((to) => {
  const title=to.meta.title as string|undefined;
  document.title=title? `${title} | Countries Dashboard`:'Countries Dashboard';
});

export default router;
