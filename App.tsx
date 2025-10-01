import { StatusBar } from "expo-status-bar";
import React from "react";
import AppContent from "./src/AppContent";

export default function App() {
  return (
    <>
      <StatusBar hidden={true} animated={true} />
      <AppContent />
    </>
  );
}
