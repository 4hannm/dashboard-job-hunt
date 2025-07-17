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
    <div className="w-full">
      {editorLoaded ? (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="w-full max-w-4xl">
                {editorRef.current?.CKEditor && (
                  <editorRef.current.CKEditor
                    editor={editorRef.current.ClassicEditor}
                    data={field.value}
                    onChange={(_: unknown, editor: any) => {
                      form.setValue(name, editor.getData());
                    }}
                    config={{
                      toolbar: [
                        "undo",
                        "redo",
                        "|",
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "blockQuote",
                      ],
                    }}
                    onReady={(editor: any) => {
                      editor.editing.view.change((writer: any) => {
                        writer.setStyle(
                          "min-height",
                          "200px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                    }}
                  />
                )}
              </div>
              <FormMessage className="mt-3" />
            </FormItem>
          )}
        />
      ) : (
        <div className="text-sm text-gray-500">Loading editor...</div>
      )}
    </div>
  );
};

export default CKEditor;
