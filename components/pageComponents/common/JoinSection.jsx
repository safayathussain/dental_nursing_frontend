import React from "react";
import Button from "../../Button";

const JoinSection = () => {
  return (
    <div className="bg-secondary-mid py-20">
      <div className="container flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary text-center max-w-[400px] sm:w-[500px]">
          Join us to learn, grow, and thrive together!
        </h1>
        <div className="max-w-[600px]">
          <p className=" text-center my-4 text-lightGray">
            Our current students chat about everything from GCSEs to
            apprenticeships, A-levels to UCAS applications. The Student Room is
            a warm, welcoming community that can offer you expert advice and
            support.
          </p>
        </div>
        <Button size="lg">Sign Up Now</Button>
      </div>
    </div>
  );
};

export default JoinSection;
