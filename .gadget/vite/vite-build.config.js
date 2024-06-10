import userConfig from "../../vite.config.js";

const newConfig = async () => {
  const config = await (typeof userConfig === "function"
    ? userConfig({
        command: "build",
        mode: "production",
      })
    : userConfig);
  config.define = {
    ...config.define,
    "process.env": "window.gadgetConfig.env",
  };
  config.build = {
    ...config.build,
    manifest: true,
  };

  config.plugins = config.plugins ? config.plugins : [];
  
  config.plugins.push({
    name: "gadget-shopify",
    order: "post",
    transformIndexHtml: () => [{
      tag: "script",
      attrs: {
        src: `https://cdn.shopify.com/shopifycloud/app-bridge.js`,
        "data-api-key": "%SHOPIFY_API_KEY%",
      },
    }]
  });
  

  return config;
};

export default newConfig;
