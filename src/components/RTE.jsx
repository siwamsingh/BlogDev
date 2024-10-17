import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';


export default function RTE({ name, control, label, value = "", curLimit, limit }) {
  return (
    <div className='w-full'>
      <div className="flex justify-between">
        <span>{label && (
          <label className="inline-block mb-1 pl-1">
            {label}
          </label>
        )}</span>

        <span>
          {(curLimit && curLimit > 0) ? 
          <>
            <span className={`${curLimit > limit && "text-red-500"}`}>{curLimit}</span>/{limit}
          </> : <></>}
        </span>
      </div>
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='m9a8bwghfzb6zfxhuclcd3gjx9xoqe4mxop35bgdpetut8vk'
            value={value}
            init={{
              value: value,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
          />
        )}
      />

    </div>
  )
}
