"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TodoList.module.scss";
import { useUploadMutation } from "@/redux/api/upload";
import {
  useDeleteTODOMutation,
  useEditDataMutation,
  useGetTODOQuery,
  usePostTODOMutation,
} from "@/redux/api/crud";
import Image from "next/image";
import { useState } from "react";

const TodoList = () => {
  const { register, handleSubmit, reset } = useForm<ICrud>();
  const {
    register: registerEdit,
    handleSubmit: edtiHandleSubmit,
    reset: editReset,
    setValue,
  } = useForm<ICrud>();

  const [uploadImg] = useUploadMutation();
  const [postData] = usePostTODOMutation();
  const [deleteData] = useDeleteTODOMutation();
  const [editData] = useEditDataMutation();
  const { data } = useGetTODOQuery();
  const [editId, setEditId] = useState<number | null>(null);

  const onSubmit: SubmitHandler<ICrud> = async (data) => {
    const file = data.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const response = await uploadImg(formData).unwrap();
    const newData = {
      _id: data._id,
      title: data.title,
      files: response.url,
    };
    await postData(newData);
    reset();
  };

  const editHandleSubmit: SubmitHandler<ICrud> = async (data) => {
    const file = data.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const response = await uploadImg(formData).unwrap();

    const newData = {
      _id: data._id!,
      title: data.title,
      files: response.url,
    };

    await editData({ _id: editId!, data: newData });
    setEditId(null);
    editReset();
  };

  return (
    <div className={scss.Todo}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.AddData}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="file" {...register("files", { required: true })} />
              <input
                type="text"
                placeholder="title"
                {...register("title", { required: true })}
              />
              <button type="submit">Add product</button>
            </form>
          </div>
          {data?.map((el) => (
            <div>
              {editId === el._id ? (
                <form onSubmit={edtiHandleSubmit(editHandleSubmit)}>
                  <input
                    type="text"
                    {...registerEdit("title", { required: true })}
                  />
                  <input
                    type="file"
                    {...registerEdit("files", { required: true })}
                  />
                  <button type="submit">save btn</button>
                </form>
              ) : (
                <div className={scss.Blocks}>
                  <div key={el._id} className={scss.block}>
                    <img src={el.files} alt="" width={200} height={200} />
                    <p>{el.title}</p>
                   <div>
                   <button onClick={() => deleteData(el._id)}>delete btn</button>
                    <button
                      onClick={() => {
                        setEditId(el._id);
                        setValue("files", el.files);
                        setValue("title", el.title);
                      }}
                    >
                      edit 
                    </button>
                   </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
