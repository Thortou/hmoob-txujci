"use client";

import { Button, Form, Input, Select, Textarea, message } from "@/src/components/forms";
import type { FormInstance } from "@/src/components/forms";
import { useRef } from "react";

export default function TestPage() {
  const formRef = useRef<FormInstance>(null);

  const handleSubmit = async (values: Record<string, unknown>) => {
    console.log("Form values:", values);
    message.success("Form submitted successfully!");
  };

  const handleFailed = () => {
    console.log("Form validation failed");
    message.error("Please fix the errors in the form");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-24 pb-20">
      <h1 className="text-4xl font-bold mb-4 text-sky-600 text-center">
        Test Form Page (Ant Design)
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
        This is a test page using Ant Design form components
      </p>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-8">
        <Form
          ref={formRef}
          onFinish={handleSubmit}
          onFinishFailed={handleFailed}
          layout="vertical"
          initialValues={{
            category: undefined,
          }}
        >
          <Input
            label="Name"
            name="name"
            required
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            rules={[
              { type: "email", message: "Please enter a valid email!" },
            ]}
          />

          <Select
            label="Category"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { value: "tech", label: "Technology" },
              { value: "design", label: "Design" },
              { value: "marketing", label: "Marketing" },
            ]}
          />

          <Textarea
            label="Message"
            name="message"
            required
            placeholder="Enter your message"
            rows={5}
          />

          <div className="flex gap-4">
            <Button htmlType="submit" type="primary" block>
              Submit
            </Button>
            <Button
              htmlType="button"
              onClick={() => formRef.current?.resetFields()}
            >
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
