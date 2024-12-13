import React from "react";
import profile from "@/public/profile.png";
import Image from "next/image";
import { LuThumbsUp } from "react-icons/lu";
import { BiSolidShare } from "react-icons/bi";
import Button from "@/components/Button";

export const QuestionComments = () => {
  return (
    <div>
      <div>
        <div className="my-3 mx-0 border  bg-white p-3 sm:p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
              <Image
                width={100}
                height={100}
                className="w-full h-full object-cover "
                src={profile}
                alt=""
              ></Image>
            </div>
            <div>
              <p className="font-semibold">Safayat Hussain</p>
              <p className="text-sm text-lightGray">19 hours ago</p>
            </div>
          </div>
          <p className=" mt-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsum
            illum soluta similique fugit voluptate ut, sapiente vero ea
            deleniti.
          </p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-7">
              <p className="flex text-primary items-center gap-1">
                <LuThumbsUp size={22} /> 124
              </p>
              <p className="flex text-primary items-center gap-1">
                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 26 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.57988 26.57L7.05855 26.4363C7.51896 26.3076 7.78789 25.83 7.65924 25.3696L2.18655 5.78498C2.10933 5.50859 1.92547 5.2742 1.67542 5.13338C1.42538 4.99255 1.12963 4.95683 0.853244 5.03407L0.791427 5.05133C0.215852 5.21214 -0.120379 5.8091 0.0404303 6.38468L5.51325 25.9693C5.64191 26.4297 6.11945 26.6987 6.57988 26.57Z"
                    fill="#3C55A5"
                  />
                  <path
                    d="M25.8521 12.8837C24.1166 12.0183 22.5111 10.9138 21.0825 9.60231C20.9624 9.49239 20.9154 9.32365 20.9614 9.16748C21.6693 6.48957 22.195 3.76679 22.5349 1.01783C22.5887 0.560588 22.3421 0.426105 22.0821 0.739898C16.9807 6.84093 8.15418 -0.376309 2.90039 5.16886C2.96347 5.28696 3.01309 5.41177 3.04832 5.54093L6.59867 18.254C11.8614 12.7761 20.6566 19.9485 25.749 13.8609C26.009 13.5471 26.0583 12.9733 25.8521 12.8837Z"
                    fill="#3C55A5"
                  />
                </svg>
                124
              </p>
            </div>
            <Button className={"flex items-center gap-2 !px-3"}>
              <BiSolidShare size={24} /> Reply
            </Button>
          </div>
          {/* comment reply */}
          <div className="my-3 mx-0 bg-secondary-low p-3 sm:p-4 border-l border-secondary">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  width={100}
                  height={100}
                  className="w-full h-full object-cover "
                  src={profile}
                  alt=""
                ></Image>
              </div>
              <div>
                <p className="font-semibold">Safayat Hussain</p>
                <p className="text-sm text-lightGray">19 hours ago</p>
              </div>
            </div>
            <p className=" mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              ipsum illum soluta similique fugit voluptate ut, sapiente vero ea
              deleniti.
            </p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-7">
                <p className="flex text-primary items-center gap-1">
                  <LuThumbsUp size={22} /> 124
                </p>
                <p className="flex text-primary items-center gap-1">
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 26 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.57988 26.57L7.05855 26.4363C7.51896 26.3076 7.78789 25.83 7.65924 25.3696L2.18655 5.78498C2.10933 5.50859 1.92547 5.2742 1.67542 5.13338C1.42538 4.99255 1.12963 4.95683 0.853244 5.03407L0.791427 5.05133C0.215852 5.21214 -0.120379 5.8091 0.0404303 6.38468L5.51325 25.9693C5.64191 26.4297 6.11945 26.6987 6.57988 26.57Z"
                      fill="#3C55A5"
                    />
                    <path
                      d="M25.8521 12.8837C24.1166 12.0183 22.5111 10.9138 21.0825 9.60231C20.9624 9.49239 20.9154 9.32365 20.9614 9.16748C21.6693 6.48957 22.195 3.76679 22.5349 1.01783C22.5887 0.560588 22.3421 0.426105 22.0821 0.739898C16.9807 6.84093 8.15418 -0.376309 2.90039 5.16886C2.96347 5.28696 3.01309 5.41177 3.04832 5.54093L6.59867 18.254C11.8614 12.7761 20.6566 19.9485 25.749 13.8609C26.009 13.5471 26.0583 12.9733 25.8521 12.8837Z"
                      fill="#3C55A5"
                    />
                  </svg>
                  124
                </p>
              </div>
              <Button className={"flex items-center gap-2 !px-3"}>
                <BiSolidShare size={24} /> Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
