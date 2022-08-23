import DashboardHeading from "../../module/dashboard/DashboardHeading";
import React from "react";
import Table from "../../components/table/Table";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import ActionView from "../../components/action/ActionView";
import ActionEdit from "../../components/action/ActionEdit";
import ActionDelete from "../../components/action/ActionDelete";

import LabelStatus from "../../components/label/LabelStatusStyles";
import { async } from "@firebase/util";
import Swal from "sweetalert2";
const CategoryManage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setCategoryList(results);
    });
  });
  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, "categories", docId);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await deleteDoc(colRef);
      }
    });
  };
  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      ></DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  <LabelStatus type="success">Approved</LabelStatus>
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>

                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
