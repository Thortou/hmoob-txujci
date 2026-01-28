"use client";

import React, { forwardRef, ReactElement } from "react";
import {
  Form as AntForm,
  Input as AntInput,
  Button as AntButton,
  Select as AntSelect,
  Checkbox as AntCheckbox,
  InputNumber,
  DatePicker as AntDatePicker,
  message,
  FormInstance,
} from "antd";
import type {
  FormProps as AntFormProps,
  FormInstance as AntFormInstance,
} from "antd";

// Define Rule type (from @rc-component/form)
// This type was removed from antd v6 exports, so we define it locally
export type RuleType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email' | 'tel';

interface BaseRule {
  warningOnly?: boolean;
  enum?: unknown[];
  len?: number;
  max?: number;
  message?: string | ReactElement;
  min?: number;
  pattern?: RegExp;
  required?: boolean;
  transform?: (value: unknown) => unknown;
  type?: RuleType;
  whitespace?: boolean;
  validateTrigger?: string | string[];
}

interface ValidatorRule {
  warningOnly?: boolean;
  message?: string | ReactElement;
  validator: (rule: RuleObject, value: unknown, callback: (error?: string) => void) => Promise<void | unknown> | void;
}

type AggregationRule = BaseRule & Partial<ValidatorRule>;

export interface RuleObject extends AggregationRule {
  type?: RuleType;
}

export type Rule = RuleObject | ((form: FormInstance) => RuleObject);

const { TextArea } = AntInput;

// Re-export antd components
export type { FormInstance };
export { message };

// Form Component with antd - supports ref
export interface FormProps extends Omit<AntFormProps, "children" | "ref"> {
  children: React.ReactNode;
}

export const Form = forwardRef<AntFormInstance, FormProps>(
  ({ children, ...props }, ref) => {
    return <AntForm ref={ref} {...props}>{children}</AntForm>;
  }
);

Form.displayName = "Form";

// Form Item Component
export interface FormItemProps {
  label?: string;
  name: string;
  rules?: Rule[];
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  valuePropName?: string;
}

export function FormItem({
  label,
  name,
  rules,
  required = false,
  children,
  className = "",
  valuePropName,
}: FormItemProps) {
  const itemRules = required
    ? [...(rules || []), { required: true, message: `${label} is required` }]
    : rules;

  return (
    <AntForm.Item
      label={label}
      name={name}
      rules={itemRules as any}
      className={className}
      valuePropName={valuePropName}
    >
      {children}
    </AntForm.Item>
  );
}

// Input Component
export interface InputProps {
  label?: string;
  name: string;
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
  type?: string;
  className?: string;
}

export function Input({
  label,
  name,
  rules,
  required = false,
  placeholder,
  type = "text",
  className = "",
}: InputProps) {
  return (
    <FormItem
      label={label}
      name={name}
      rules={rules as any}
      required={required}
      className={className}
    >
      <AntInput type={type} placeholder={placeholder} />
    </FormItem>
  );
}

// Password Input
export interface PasswordInputProps {
  label?: string;
  name: string;
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function PasswordInput({
  label,
  name,
  rules,
  required = false,
  placeholder = "Enter password",
  className = "",
}: PasswordInputProps) {
  return (
    <FormItem
      label={label}
      name={name}
      rules={rules as any}
      required={required}
      className={className}
    >
      <AntInput.Password placeholder={placeholder} />
    </FormItem>
  );
}

// Textarea Component
export interface TextareaProps {
  label?: string;
  name: string;
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export function Textarea({
  label,
  name,
  rules,
  required = false,
  placeholder,
  rows = 4,
  className = "",
}: TextareaProps) {
  return (
    <FormItem
      label={label}
      name={name}
      rules={rules as any}
      required={required}
      className={className}
    >
      <TextArea placeholder={placeholder} rows={rows} />
    </FormItem>
  );
}

// Select Component
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  name: string;
  options: SelectOption[];
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
  mode?: "multiple" | "tags" | undefined;
  className?: string;
  onChange?: (value: string | string[] | undefined) => void;
}

export function Select({
  label,
  name,
  options,
  rules,
  required = false,
  placeholder,
  mode,
  className = "",
  onChange,
}: SelectProps) {
  return (
    <FormItem
      label={label}
      name={name}
      rules={rules as any}
      required={required}
      className={className}
    >
      <AntSelect
        placeholder={placeholder}
        mode={mode}
        options={options}
        onChange={onChange}
      />
    </FormItem>
  );
}

// Checkbox Component
export interface CheckboxProps {
  label?: string;
  name: string;
  rules?: Rule[];
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Checkbox({
  label,
  name,
  rules,
  required = false,
  children,
  className = "",
}: CheckboxProps) {
  return (
    <FormItem
      label={label}
      name={name}
      rules={rules as any}
      required={required}
      valuePropName="checked"
      className={className}
    >
      <AntCheckbox>{children}</AntCheckbox>
    </FormItem>
  );
}

// Number Input Component
export interface NumberInputProps {
  label?: string;
  name: string;
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
}

export function NumberInput({
  label,
  name,
  rules,
  required = false,
  placeholder,
  min,
  max,
  className = "",
}: NumberInputProps) {
  return (
    <FormItem
      label={label}
      name={name}
      rules={rules as any}
      required={required}
      className={className}
    >
      <InputNumber
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full"
      />
    </FormItem>
  );
}

// Date Picker Component
export interface DatePickerProps {
  label?: string;
  name: string;
  rules?: Rule[];
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  label,
  name,
  rules,
  required = false,
  placeholder,
  className = "",
}: DatePickerProps) {
  return (
    <FormItem
      label={label}
      name={name}
      rules={rules as any}
      required={required}
      className={className}
    >
      <AntDatePicker style={{ width: "100%" }} placeholder={placeholder} />
    </FormItem>
  );
}

// Button Component
export interface ButtonProps {
  type?: "primary" | "default" | "dashed" | "link" | "text";
  htmlType?: "button" | "submit" | "reset";
  danger?: boolean;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function Button({
  type = "primary",
  htmlType = "button",
  danger = false,
  block = false,
  loading = false,
  disabled = false,
  children,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <AntButton
      type={type}
      htmlType={htmlType}
      danger={danger}
      block={block}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </AntButton>
  );
}

// Submit Button Component
export interface SubmitButtonProps {
  text?: string;
  loading?: boolean;
  block?: boolean;
  className?: string;
}

export function SubmitButton({
  text = "Submit",
  loading = false,
  block = false,
  className = "",
}: SubmitButtonProps) {
  return (
    <AntButton
      type="primary"
      htmlType="submit"
      loading={loading}
      block={block}
      className={className}
    >
      {text}
    </AntButton>
  );
}
