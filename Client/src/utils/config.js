class DevelopmentConfig {
    rootUrl = "http://localhost:3001/";
    getCodeBlocks = "http://localhost:3001/api/codeblocks/";
}

class ProductionConfig {
    // Production-specific configuration
}

const config = process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
