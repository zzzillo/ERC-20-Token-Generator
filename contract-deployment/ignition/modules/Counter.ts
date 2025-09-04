import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CounterModule", (m) => {
  const counter = m.contract("Counter");

  m.call(counter, "incBy", [5n], { id: "IncrementBy" });
  m.call(counter, "inc", [], { id: "IncrementBy5" });
  m.call(counter, "inc", [], { id: "IncrementBy10" });
  
  return { counter };
});
