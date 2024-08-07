"use client";
import { ClipLoader } from "react-spinners";

interface SpinnerProps {}

export default function Spinner({}: SpinnerProps) {
  return <ClipLoader size={100} />;
}
