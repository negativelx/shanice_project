import { App, ObjectDirective } from "vue";
import Tooltip from "primevue/tooltip";
import BadgeDirective from "primevue/badgedirective";
import Ripple from "primevue/ripple";
import StyleClass from "primevue/styleclass";
import { useAppStore } from "@/stores/AppStore";
import Prism from "prismjs";

const Permission: ObjectDirective = {
  mounted(el: HTMLButtonElement, binding) {
    if (binding.value == undefined) return;
    const { action, effect } = binding.value;
    if (!hasPermission(action)) {
      if (effect == "disabled") {
        el.disabled = true;
        el.style["disabled"] = "disabled";
        el.classList.add("n-Button--disabled");
      } else {
        el.remove();
      }
    }
  }
}, CodeHighlight = {
  beforeMount(el, binding) {
    if (binding.modifiers.script) el.className = "language-javascript";
    else if (binding.modifiers.css) el.className = "language-css";
    else el.className = "language-markup";

    Prism.highlightElement(el.children[0]);
  }
};

function hasPermission(accesses: string[]): boolean {
  if (!accesses || !accesses.length) return true;
  return _somePermissions(accesses);
}

function _somePermissions(accesses: string[]) {
  const appStore = useAppStore();
  return appStore.getPermissions().some((permission) => {
    return accesses.includes(permission);
  });
}

export const setupDirectives = {
  install(app: App) {
    //
    app.directive("permission", Permission);
    app.directive("tooltip", Tooltip);
    app.directive("badge", BadgeDirective);
    app.directive("ripple", Ripple);
    app.directive("code", CodeHighlight);
    app.directive("styleclass", StyleClass);
  }
};
