import React from "react";
import Categorys from "./Categorys/Categorys";
import ClientFeedback from "./ClientFeedback/ClientFeedback";
import ContactSection from "./ContactSection/ContactSection";
import Slider from "./Slider/Slider";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div className="">
      <Slider />
      <Categorys />
      <WhyChooseUs />
      <ContactSection />
      <ClientFeedback />
    </div>
  );
};

export default Home;
