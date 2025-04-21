class DevelopmentConfig {
    rootUrl = import.meta.env.VITE_API_ROOT;
    getCodeBlocks = import.meta.env.VITE_API_ROOT + "api/codeblocks/";
}

class ProductionConfig {
    rootUrl = import.meta.env.VITE_API_ROOT;
    getCodeBlocks = import.meta.env.VITE_API_ROOT + "api/codeblocks/";
}

const config = import.meta.env.MODE === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
