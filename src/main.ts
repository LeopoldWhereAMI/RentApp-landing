import "./styles/styles.css";
import { createIcons, icons } from "lucide";
import Header from "./scripts/components/Header";
import Inventory from "./scripts/components/Inventory";

createIcons({ icons });

new Header();
new Inventory();
