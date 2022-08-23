import { doc, getDoc } from "firebase/firestore";
import { values } from "lodash";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Radio } from "../../components/checkbox";
import { Field, FieldCheckboxes } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { db } from "../../firebase-app/firebase-config";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";

const CategoryUpdate = () => {
  const { control, reset, watch, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {},
  });
  const [params] = useSearchParams();

  const categoryId = params.get("id");
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  const handleUpdateCategory = (values) => {
    console.log(values);
  };
  if (!categoryId) return null;
  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id:${categoryId}`}
      ></DashboardHeading>
      {/* handleSubmit (){
            const name="front end"
            return name
      }
        handleSubmit()
       */}
      <form onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[200px]" type="submit">
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
