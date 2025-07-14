/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useEffect, useState, useRef, JSX } from "react";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface CKEditorProps {
  form: UseFormReturn<any>;
  name: string;
}

type EditorModule = {
  CKEditor: (props: any) => JSX.Element;
  ClassicEditor: unknown;
};

const CKEditor: FC<CKEditorProps> = ({ form, name }) => {
  const editorRef = useRef<EditorModule | null>(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  return (
    <>
      {editorLoaded ? (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {editorRef.current?.CKEditor && (
                <editorRef.current.CKEditor
                  editor={editorRef.current.ClassicEditor}
                  data={field.value}
                  onChange={(_: unknown, editor: any) => {
                    form.setValue(name, editor.getData());
                  }}
                />
              )}
              <FormMessage className="mt-3" />
            </FormItem>
          )}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default CKEditor;
