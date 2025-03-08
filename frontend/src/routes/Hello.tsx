import { useAuthentication } from "@/hooks/useAuthentication";
import { Heart, Activity, BarChart } from "lucide-react";
import { LogoHeader } from "@/Components/LogoHeader/LogoHeader";
import { FeatureCard } from "@/Components/FeatureCard/FeatureCard";

function Hello() {
  const { initiateLogin, checkIfUserCookiesExist } = useAuthentication();

  checkIfUserCookiesExist();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-100 dark:bg-gray-800" style={{ padding: "10px" }}>
        <LogoHeader backgroundColor={false} />
      </div>
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"></header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Meals, Transform Your Life
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  MyGreenDays helps you monitor your meat consumption and
                  supports you in living a healthier life. Science generally
                  agrees that in addition to consistent triathlon training, a
                  balanced diet is the most important factor for a healthy life.
                  We empower you to achieve your nutrition goals!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  onClick={initiateLogin}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<BarChart className="h-10 w-10 mb-4 text-primary" />}
                title="Meat Consumption Tracker"
                description="Easily log and monitor your daily meat intake with our intuitive interface."
              />
              <FeatureCard
                icon={<Heart className="h-10 w-10 mb-4 text-primary" />}
                title="Personalized Health Tips"
                description="Receive tailored advice to improve your diet and overall well-being."
              />
              <FeatureCard
                icon={<Activity className="h-10 w-10 mb-4 text-primary" />}
                title="Progress Insights"
                description="Visualize your journey towards a healthier lifestyle with detailed analytics."
              />
            </div>
          </div>
        </section>
        <section
          id="cta"
          className="py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Start Your Green Journey Today
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl">
                  Download MyGreenDays now and take the first step towards a
                  healthier you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  onClick={initiateLogin}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 w-full sm:w-auto"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 MyGreenDays. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Hello;
