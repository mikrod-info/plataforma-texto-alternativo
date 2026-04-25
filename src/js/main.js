import { domReady } from './utils/dom-ready.js';
import { initNavMenu } from './components/nav-menu.js';
import { initCatalogTree} from "./components/catalog-tree.js";
import { initThemeSwitch } from './components/theme-switch.js';

domReady(()=> {
    initNavMenu();
    initCatalogTree();
    initThemeSwitch();
});