"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// index.ts
var dotenv3 = __toESM(require("dotenv"), 1);
var import_reflect_metadata = require("reflect-metadata");
var import_node_server = require("@hono/node-server");
var import_hono5 = require("hono");
var import_cors = require("hono/cors");

// src/db/orm/data-source.ts
var import_typeorm3 = require("typeorm");
var dotenv = __toESM(require("dotenv"), 1);

// src/entity/User.ts
var import_typeorm = require("typeorm");
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
var User = class User2 {
  id;
  user_name;
  password;
  phone;
  wc_unionid;
  wc_openid;
  age;
  create_time;
  gender;
  region;
};
__decorate([
  (0, import_typeorm.PrimaryGeneratedColumn)("uuid", { comment: "\u7528\u6237id" }),
  __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
  (0, import_typeorm.Column)("varchar", { length: 255, nullable: true }),
  __metadata("design:type", String)
], User.prototype, "user_name", void 0);
__decorate([
  (0, import_typeorm.Column)("varchar", { length: 255, nullable: true }),
  __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
  (0, import_typeorm.Column)("varchar", { length: 16 }),
  __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
  (0, import_typeorm.Column)("varchar", { length: 255 }),
  __metadata("design:type", String)
], User.prototype, "wc_unionid", void 0);
__decorate([
  (0, import_typeorm.Column)("varchar", { length: 255 }),
  __metadata("design:type", String)
], User.prototype, "wc_openid", void 0);
__decorate([
  (0, import_typeorm.Column)("int", { nullable: true }),
  __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
  (0, import_typeorm.CreateDateColumn)(),
  __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], User.prototype, "create_time", void 0);
__decorate([
  (0, import_typeorm.Column)("boolean", { default: false }),
  __metadata("design:type", Boolean)
], User.prototype, "gender", void 0);
__decorate([
  (0, import_typeorm.Column)("varchar", { length: 255, default: null, nullable: true, comment: "\u7528\u6237\u5730\u533A" }),
  __metadata("design:type", String)
], User.prototype, "region", void 0);
User = __decorate([
  (0, import_typeorm.Entity)()
], User);

// src/entity/Tree.ts
var import_typeorm2 = require("typeorm");
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata2 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a2;
var _b;
var Tree = class Tree2 {
  id;
  owner_id;
  create_date;
  update_date;
};
__decorate2([
  (0, import_typeorm2.PrimaryGeneratedColumn)("increment"),
  __metadata2("design:type", Number)
], Tree.prototype, "id", void 0);
__decorate2([
  (0, import_typeorm2.Column)("uuid"),
  __metadata2("design:type", String)
], Tree.prototype, "owner_id", void 0);
__decorate2([
  (0, import_typeorm2.CreateDateColumn)(),
  __metadata2("design:type", typeof (_a2 = typeof Date !== "undefined" && Date) === "function" ? _a2 : Object)
], Tree.prototype, "create_date", void 0);
__decorate2([
  (0, import_typeorm2.UpdateDateColumn)(),
  __metadata2("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Tree.prototype, "update_date", void 0);
Tree = __decorate2([
  (0, import_typeorm2.Entity)()
], Tree);

// src/db/orm/data-source.ts
dotenv.config({ path: ".env.dev" });
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USERNAME:", process.env.DB_USERNAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_DATABASE:", process.env.DB_DATABASE);
var AppDataSource = new import_typeorm3.DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  // 或者 false，根据你的需求
  logging: ["query", "error"],
  // 启用查询和错误日志
  entities: [User, Tree],
  migrations: [],
  subscribers: []
});
AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
}).catch((err) => {
  console.error("Error during Data Source initialization:", err);
});

// src/utils/logger.ts
var import_pino = __toESM(require("pino"), 1);
var logger = (0, import_pino.default)({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  transport: process.env.NODE_ENV === "development" ? {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard"
    }
  } : void 0
});
var createModuleLogger = (module2) => {
  return logger.child({ module: module2 });
};

// src/routes/device.ts
var import_hono = require("hono");
var deviceRoutes = new import_hono.Hono();
var device_default = deviceRoutes;

// src/routes/misc.ts
var import_hono2 = require("hono");
var miscRoutes = new import_hono2.Hono();
var misc_default = miscRoutes;

// src/routes/auth.ts
var import_hono3 = require("hono");
var bcrypt = __toESM(require("bcrypt"), 1);
var authLogger = createModuleLogger("auth");
var authRoutes = new import_hono3.Hono();
authRoutes.post("/register", async (c) => {
  authLogger.info("Registering a new user...");
  const body = await c.req.parseBody();
  const user = new User();
  user.user_name = "Timber";
  user.password = bcrypt.hashSync("Saw1", 10);
  user.phone = "123456789";
  user.wc_openid = "123456789";
  user.wc_unionid = "123456789";
  await AppDataSource.manager.save(user);
  const allUsers = await AppDataSource.manager.find(User);
  const timber = await AppDataSource.manager.findOne(User, { select: ["user_name"], where: { user_name: "Timber" } });
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.create({
    user_name: "Timber",
    password: bcrypt.hashSync("Saw2", 10),
    phone: "123456789",
    wc_openid: "123456789",
    wc_unionid: "123456789"
  });
  await userRepository.save(newUser);
  const allUsers2 = await userRepository.find();
  const firstUser2 = await userRepository.findOneBy({ user_name: "Timber" });
  const timber2 = await userRepository.findBy({ user_name: "Timber", age: 25 });
  const [users, usersCount] = await userRepository.findAndCount();
  console.log(users);
  console.log("count: " + usersCount);
  return c.json({
    code: 200,
    message: null,
    data: {
      // TODO: 返回数据
      token: "sample_token"
    }
  });
});
var auth_default = authRoutes;

// src/routes/user_route.ts
var import_hono4 = require("hono");

// src/controllers/user_controller.ts
var dotenv2 = __toESM(require("dotenv"), 1);
dotenv2.config({ path: ".env.dev" });
var UserController = class {
  async getUsers(c) {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      return c.json(users, 200);
    } catch (error) {
      console.error("Error fetching users:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  }
  async getUserById(c) {
    try {
      const { id } = c.req.param();
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id });
      if (!user) {
        return c.json({ error: "User not found" }, 404);
      }
      return c.json(user, 200);
    } catch (error) {
      console.error("Error fetching user:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  }
  // //实现发送验证码的功能
  // async getVerifaction(phone: string) {
  //     try {
  //         const smsService = new SmsService();
  //         // 从环境变量中读取 signName 和 templateCode
  //         const signName = process.env.SIGN_NAME;
  //         const templateCode = process.env.TEMPLATE_CODE;
  //         const code = generateSecureRandomCode(6); // 示例验证码，可以随机生成
  //         if (!signName || !templateCode) {
  //             throw new Error('Missing required environment variables for SMS service');
  //         }
  //         const result = await smsService.sendVerificationCode(phone, code, signName, templateCode);
  //         if (result.success) {
  //             console.log('验证码发送成功');
  //         } else {
  //             console.error('验证码发送失败');
  //         }
  //     } catch (error) {
  //         if (error instanceof Error) { // 进行类型检查和断言
  //             console.error('处理过程中发生错误:', error.message);
  //         } else {
  //             console.error('处理过程中发生未知错误:', error);
  //         }
  //     }
  // }
  // //实现发送验证码的功能
  // async register(c: Context) {
  //     try {
  //         const requestBody = await c.req.json();
  //         const { phone, verificationCode } = requestBody;
  //         if (!phone || !verificationCode) {
  //             return handleErrorResponse(c, 'Phone number and verification code are required', 400);
  //         }
  //         // 从 Redis 获取验证码
  //         const storedVerificationCode = await redisClient.get(`verification:${phone}`);
  //         if (!storedVerificationCode) {
  //             return handleErrorResponse(c, 'No verification code found for this phone number', 400);
  //         }
  //         if (storedVerificationCode !== verificationCode) {
  //             return handleErrorResponse(c, 'Invalid verification code', 400);
  //         }
  //         // 清除已验证的验证码
  //         await redisClient.del(`verification:${phone}`);
  //         // 执行注册逻辑，例如保存用户信息到数据库
  //         const userRepository = AppDataSource.getRepository(User);
  //         const newUser = new User();
  //         newUser.phone = phone;
  //         // 设置其他必要的用户属性
  //         await userRepository.save(newUser);
  //         return handleSuccessResponse(c, null, 'User registered successfully', 200);
  //     } catch (error) {
  //         console.error('Error during registration:', error);
  //         return handleErrorResponse(c, 'Internal Server Error', 500, error);
  //     }
  // }
  // //登录的逻辑实现
  // async login(c: Context) {
  //     try {
  //         const requestBody = await c.req.json();
  //         const { user_name, password, phone, verificationCode } = requestBody;
  //         if (user_name && password) {
  //             // 用户名和密码登录
  //             console.log("正在进行用户名和密码登录：", user_name, password);
  //             let result = await this.loginByUsernameAndPassword(user_name, password);
  //             return handleSuccessResponse(c, result.user, "登录成功", 200);
  //         } else if (phone && verificationCode) {
  //             // 手机号和验证码登录
  //             let result = await this.loginByPhoneAndVerificationCode(phone, verificationCode);
  //             if (result.success == true) {
  //                 return handleSuccessResponse(c, result.user, "登录成功", 200);
  //             }
  //         } else {
  //             return handleErrorResponse(c, 'Invalid parameters', 400);
  //         }
  //     } catch (error) {
  //         console.error('Error during login:', error);
  //         return handleErrorResponse(c, 'Internal Server Error', 500, error);
  //     }
  // }
  //根据用户名和密码登录
  async loginByUsernameAndPassword(username, password) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { user_name: username } });
    console.log("user:", user);
    if (!user) {
      throw new Error("User not found");
    }
    let isPasswordValid = false;
    if (password === user.password) {
      console.log("\u5BC6\u7801\u6B63\u786E");
      isPasswordValid = true;
    } else {
      isPasswordValid = false;
    }
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    return { success: true, user };
  }
  // //根据电电话号码和验证码登录
  // private async loginByPhoneAndVerificationCode(phone: string, verificationCode: string) {
  //     const userRepository = AppDataSource.getRepository(User);
  //     const user = await userRepository.findOne({ where: { phone } });
  //     if (!user) {
  //         throw new Error('User not found');
  //     }
  //     // 从 Redis 获取验证码
  //     const storedVerificationCode = await redisClient.get(`verification:${phone}`);
  //     if (!storedVerificationCode) {
  //         throw new Error('No verification code found for this phone number');
  //     }
  //     if (storedVerificationCode !== verificationCode) {
  //         throw new Error('Invalid verification code');
  //     }
  //     // 清除已验证的验证码
  //     await redisClient.del(`verification:${phone}`);
  //     // 登录成功，返回用户信息或生成 token 等操作
  //     return { success: true, user };
  // }
};

// src/routes/user_route.ts
var userController = new UserController();
var app = new import_hono4.Hono();
app.get("/users", userController.getUsers);
app.get("/users/:id", userController.getUserById);
var user_route_default = app;

// index.ts
dotenv3.config({ path: ".env.dev" });
var indexLogger = createModuleLogger("index");
dotenv3.config({ path: ".env.dev" });
indexLogger.info(".env file loaded");
indexLogger.info(process.env);
var app2 = new import_hono5.Hono();
var apiV1 = new import_hono5.Hono();
app2.use("*", (0, import_cors.cors)());
apiV1.use("*", (0, import_cors.cors)());
app2.get("/", (c) => {
  return c.text("Hello Hono!");
});
app2.get("/posts/:id", (c) => {
  const page = c.req.query("page");
  const id = c.req.param("id");
  c.header("X-Message", "Hi!");
  return c.text(`You want see ${page} of ${id}`);
});
apiV1.route("/device", device_default);
apiV1.route("/", misc_default);
apiV1.route("/", auth_default);
apiV1.route("/", user_route_default);
app2.route("/api/v1", apiV1);
var port = 3090;
AppDataSource.initialize().then(() => {
  indexLogger.info("App datasource initialized");
}).catch((error) => indexLogger.error(error)).then(() => {
  (0, import_node_server.serve)({
    fetch: app2.fetch,
    port
  });
}).then(() => {
  indexLogger.info(`Server is running on port ${port}`);
});
