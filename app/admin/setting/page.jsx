"use client";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { FetchApi } from "@/utils/FetchApi";
import React, { useEffect, useState } from "react";

const page = () => {
  const [setting, setSetting] = useState({});
  useEffect(() => {
    const loadData = async () => {
      const { data } = await FetchApi({ url: "/setting/get" });
      setSetting(data?.data)
    };
    loadData();
  }, []);
  const saveHandler = async (e) => {
    e.preventDefault();
    const {
      email,
      phone,
      location,
      linkedIn,
      twitter,
      youtube,
      facebook,
      instagram,
    } = e.target;
    const body = {
      email: email.value,
      phone: phone.value,
      location: location.value,
      linkedIn: linkedIn.value,
      twitter: twitter.value,
      youtube: youtube.value,
      facebook: facebook.value,
      instagram: instagram.value,
    };
    await FetchApi({ url: "/setting/update" , method: 'post', data: body, isToast: true});
  };
  return (
    <form onSubmit={saveHandler}>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Setting</p>

        <Button variant="primary-blue" className={"mt-5"}>
          Save Changes
        </Button>
      </div>
      <div className="p-4 mt-10 border rounded-lg">
        <p className="text-xl">Contact</p>
        <div className="mt-5 grid grid-cols-3 gap-4">
          <TextInput label={"Email"} name={"email"} defaultValue={setting?.email} type="email"/>
          <TextInput label={"Phone"} name={"phone"} defaultValue={setting?.phone} type="tel"/>
          <TextInput label={"Location"} name={"location"} defaultValue={setting?.location}/>
          <TextInput label={"LinkedIn"} name={"linkedIn"}defaultValue={setting?.linkedIn} />
          <TextInput label={"Twitter"} name={"twitter"} defaultValue={setting?.twitter}/>
          <TextInput label={"Youtube"} name={"youtube"} defaultValue={setting?.youtube}/>
          <TextInput label={"Facebook"} name={"facebook"} defaultValue={setting?.facebook}/>
          <TextInput label={"Instagram"} name={"instagram"} defaultValue={setting?.instagram}/>
        </div>
      </div>
    </form>
  );
};

export default page;
