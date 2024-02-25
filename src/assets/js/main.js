import flyingPages from "flying-pages-module";
import Alpine from "alpinejs";
import dataDOM from "./modules/Alpine.data/DOM";
import "lite-youtube-embed";
import debugLog from "./modules/_debugLog";

// The window.Alpine = Alpine bit is optional, but is nice to have for
// freedom and flexibility. Like when tinkering with Alpine from the devtools for example.
window.Alpine = Alpine;

// If you imported Alpine into a bundle, you have to make sure you are registering any
// extension code IN BETWEEN when you import the Alpine global object, and when you
// initialize Alpine by calling Alpine.start().

// Add plugins to Alpine
//Alpine.plugin(intersect);

Alpine.data("xDOM", dataDOM);

// Start Alpine when the page is ready.
window.addEventListener("DOMContentLoaded", () => {
    debugLog("DOMContentLoaded");
	Alpine.start();
	flyingPages({});
});
