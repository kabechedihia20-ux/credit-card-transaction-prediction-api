import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Détection de Fraude",
      version: "1.0.0",
      description: "Documentation de l’API du système de détection de fraude bancaire.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./routes/*.js"], // <- Documente automatiquement toutes tes routes
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
export const swaggerUiMiddleware = swaggerUi;
