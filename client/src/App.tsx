import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
<<<<<<< HEAD
=======
import LandingPage from "@/pages/landing-page";
>>>>>>> c6cbdde7dfbc6c422c8b8ca5d386a896f9fab538
import GeoGridDashboard from "@/pages/geo-grid-dashboard";
import Step1Business from "@/pages/step1-business";
import Step2Location from "@/pages/step2-location";
import Step3Keyword from "@/pages/step3-keyword";
import Step4Grid from "@/pages/step4-grid";
import Step5Review from "@/pages/step5-review";
import MapPage from "@/pages/map-page";
import ReportPage from "@/pages/report-page";
import CampaignDashboard from "@/pages/campaign-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
<<<<<<< HEAD
      <Route path="/" component={GeoGridDashboard} />
=======
      <Route path="/" component={LandingPage} />
>>>>>>> c6cbdde7dfbc6c422c8b8ca5d386a896f9fab538
      <Route path="/geo-grid-dashboard" component={GeoGridDashboard} />
      <Route path="/analyze" component={Step1Business} />
      <Route path="/location" component={Step2Location} />
      <Route path="/keyword" component={Step3Keyword} />
      <Route path="/grid" component={Step4Grid} />
      <Route path="/review" component={Step5Review} />
      <Route path="/dashboard" component={CampaignDashboard} />
      <Route path="/map" component={MapPage} />
<<<<<<< HEAD
      <Route path="/report/:projectId" component={ReportPage} />
=======
>>>>>>> c6cbdde7dfbc6c422c8b8ca5d386a896f9fab538
      <Route path="/report" component={ReportPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
