import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Academies from "./pages/Academies";
import Demo from "./pages/Demo";
import Scouts from "./pages/Scouts";
import Upload from "./pages/Upload";
import Compare from "./pages/Compare";
import SportID from "./pages/SportID";
import Product from "./pages/Product";
import Players from "./pages/Players";
import Governance from "./pages/Governance";
import SubGovernance from "./pages/SubGovernance";
import TeamMembers from "./pages/TeamMembers";

function Router() {
  return (
    <Switch>
      {/* Main routes */}
      <Route path={"/"} component={Home} />
      <Route path={"/product"} component={Product} />
      <Route path={"/demo"} component={Demo} />
      <Route path={"/academies"} component={Academies} />
      <Route path={"/scouts"} component={Scouts} />
      <Route path={"/players"} component={Players} />
      <Route path={"/compare"} component={Compare} />
      <Route path={"/upload"} component={Upload} />
      <Route path={"/sportid"} component={SportID} />
      {/* Governance routes */}
      <Route path={"/governance"} component={Governance} />
      <Route path={"/governance/sub"} component={SubGovernance} />
      <Route path={"/governance/team"} component={TeamMembers} />
      {/* Fallback */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
