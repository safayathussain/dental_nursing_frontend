import React from "react";
import defaultPfp from "@/public/icons/default_pfp.svg.webp";
import Image from "next/image";
const Profile = ({ imgUrl, className }) => {
  return (
    <>
      {imgUrl ? (
        <Image
          width={100}
          height={100}
          className={`w-10 h-10 rounded-full ${className}`}
          src={imgUrl}
          alt=""
        ></Image>
      ) : (
        <Image
          width={200}
          height={200}
          className={`w-10 h-10 rounded-full ${className}`}
          src={defaultPfp}
          alt=""
        ></Image>
      )}
    </>
  );
};

export default Profile;
