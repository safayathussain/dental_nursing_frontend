import React from "react";
import Button from "../../Button";

const HomePageQuestions = () => {
  return (
    <div className="container py-20">
      <div>
        <div className="flex gap-2">
          <Button variant="primary">Latest</Button>
          <Button
            variant="secondary"
            className={
              "hover:bg-secondary-low hover:text-primary duration-300 hover:outline-2  hover:outline-secondary-mid"
            }
          >
            Latest
          </Button>
          <Button
            variant="secondary"
            className={
              "hover:bg-secondary-low hover:text-primary duration-300 hover:outline-2 hover:outline-secondary-mid"
            }
          >
            Latest
          </Button>
          <Button
            variant="secondary"
            className={
              "hover:bg-secondary-low hover:text-primary duration-300 hover:outline-2 hover:outline-secondary-mid"
            }
          >
            Latest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePageQuestions;
