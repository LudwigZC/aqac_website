import HomePage from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata("en", "home"),
  // Public Search Console ownership proof. Keep this tag after verification.
  verification: { google: "_mcrJDRG7bvG1uPh9pLdK_E9aA6D_510nixzaY1Vum8" },
};

export default HomePage;
