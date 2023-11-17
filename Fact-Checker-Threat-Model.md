# Fact Checker Threat Model

**Application Version:** 1.0 **Description:** The Fact Checker App provides a plattform, on which users can check statements (recent and frequent on the internet), for their validity. Users can also post statements themselves and get ratings from other users. **Document Owner:** Leif Etter

## Table Of Contents

- [Introduction](craftdocs://open?blockId=72FB7E28-7F31-4308-AF8C-82AC275A8241&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [External Dependencies](craftdocs://open?blockId=D45826F8-47FB-4696-B4F3-8B0A2DA434BC&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Entry Points](craftdocs://open?blockId=0FEEFB51-235E-42A7-A258-5A10E978E6B5&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Assets](craftdocs://open?blockId=24A13371-2F03-4A66-9312-9ADE474C3298&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Trust Levels](craftdocs://open?blockId=960ECB67-399B-4A56-8E74-48359A8495AA&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [STRIDE Threat Analysis](craftdocs://open?blockId=C4C91F17-8CCE-45F6-A798-D72C44E40EA0&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
  - [Spoofing](craftdocs://open?blockId=0A31F81F-D929-4C9A-B83C-6883BB6B2DB3&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
  - [Tampering](craftdocs://open?blockId=F25FB89C-CD2E-4A12-8A2F-6D9916A03780&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
  - [Repudiation](craftdocs://open?blockId=924E86ED-F679-433E-BE64-F7F49E3D1FEF&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
  - [Information Disclosure](craftdocs://open?blockId=7FAF5684-4B4D-429B-A51C-5BAD6AB74489&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
  - [Denial of Service](craftdocs://open?blockId=F0FE61A0-D2DA-479A-8755-56244B48A652&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
  - [Elevation of Privilege](craftdocs://open?blockId=1E8932EA-6E8F-4FB3-9727-2BEBBBF70A45&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Graphical Overview](craftdocs://open?blockId=395A4756-F1AA-4B84-A6A8-7B4E542BDD3E&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [XSS Attacks](craftdocs://open?blockId=EE6ED47C-0554-413F-84D4-9B68056FBC4B&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Implemented Measures](craftdocs://open?blockId=E6A57CCC-D40C-4E5B-9F86-93E635649112&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)

### Introduction

In this Threat Model, I take a mixed approach of traditional modeling as documented by OWASP, as well as my own approach to analyzing attack techniques themselves using flow diagrams to help me illustrate and analyze all the threats the Factchecker App could face.

## External Dependencies

| **ID** | D**escription**                                                                                                 |
| ------ | --------------------------------------------------------------------------------------------------------------- |
| 1      | The Node.JS Backend will run on an EC2 Instance, inside the AWS cloud.                                          |
| 2      | The Next.JS Frontend runs on the users machine.                                                                 |
| 3      | The Postgres Database is hosted inside the AWS [insert here] and is password protected [insert sql permissions] |
| 4      | Image Uploads are stored in an AWS S3 Bucket, which has access permissions [insert here].                       |
| 5      | The Backend and the Frontend communicate over HTTPS.                                                            |
| 7      | Github Server which installed packages are updated from                                                         |

## Entry Points

| **ID** | **Name**   | **Description**                                                                        |
| ------ | ---------- | -------------------------------------------------------------------------------------- |
| 1      | HTTPS Port | Backend is Available over HTTPS Port, to access any backend route HTTPS has to be used |
| 2      | Web App    | The NextJS webapp that communicated with the Backend thorugh HTTPS                     |

## Assets

| **ID** | **Name**                                             | **Description**                                                                                                                       | Trust Levels  |
| ------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **1**  | **Users and Admins**                                 | **Assets relating to all users**                                                                                                      |               |
| 1.1    | User Login Details                                   |                                                                                                                                       | 2, 3, 4, 5    |
| 1.2    | Admin Login Details                                  |                                                                                                                                       | 3, 4, 5       |
| 1.3    | Verified Claims and Public Statements                | Public Claims and Statements made by users                                                                                            | 1, 2, 3, 4, 5 |
| 1.4    | Unverified Claims                                    | Claims that haven't been switched to public yet because they haven't been verified                                                    | 2, 3, 4, 5    |
| 1.5    | Avatar, Name and Biography of users                  | All Details a user has chosen to show publicly                                                                                        | 1, 2, 3, 4, 5 |
| 2      | **System Assets**                                    | **Assets relating to the AWS System**                                                                                                 |               |
| 2.1    | Availability of FactChecker Website                  | Availability of both the backend and frontend                                                                                         | 4, 5          |
| 2.2    | Ability to Execute Code                              | Ability to execute code on the server                                                                                                 | 4, 5          |
| 2.3    | Ability to Execute SQL as a Database Read/Write User | The ability to execute SQL queries such as Select, Insert, and Update, and access any information stored in the FactChecker Database. | 4             |
| 2.4    | Ability to Read/Write to S3                          | The ability to store images on S3 and retrieve all images, as well as delete images.                                                  | 4             |
| 2.5    | Logs                                                 | Ability to access all Logs containing information about all parts of the system                                                       | 4, 5          |

## Trust Levels

| **ID** | **Name**                          | **Description**                                                                                                                                                   |
| ------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | Anonymous Web User                | User who visits the fact checker web app, but isn't logged in.                                                                                                    |
| 2      | User with Valid Login Credentials | A user who has logged into the Web App and has logged in, receiving an http-only cookie containing a jwt token for authentication.                                |
| 3      | Admin                             | The admin is logged in and has an admin role, which allows him to access routes to view personal information and do actions such as deleting accounts and claims. |
| 4      | AWS Account Administrator         | Has full access to the Node Backend, S3 Storage Bucket and Database.                                                                                              |
| 5      | Vercel Account Administrator      | Has full access to the hosted next.js frontend.                                                                                                                   |

## STRIDE Threat Analysis

Using STRIDE to analyze some possible threats to the system, I have created a few diagrams, each showing a possibility of what could happen, and how the attacker could achieve this. Additionally the diagrams show possible ways to mitigate these threats. While the diagrams relate to more concepts than just the one in the heading, the heading represents the main threat.

**Spoofing**

![Possible Threats (5).png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/5267FCC8-0B65-4C27-9855-543EC545503B/1ABB874F-92DB-4A1F-9D76-4D01DDD3170B_2/AZm6vPR3TXGF8ytlCD81w2loV9m0ZXxiHVQ7abSszwIz/Possible%20Threats%205.png)

**Tampering**

Files, Stored Data and Code in a system might be tampered with, and allow the attacker to deny service or inject his own code.

![Possible Threats (7).png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/5267FCC8-0B65-4C27-9855-543EC545503B/1F61BD8F-DB95-4356-97CD-464BE4C99B98_2/vntsu3ItEU6N1VCDVGKn0IM7vp0parjTVhfOTCu4Je0z/Possible%20Threats%207.png)

**Repudiation**

The System might not log actions correctly, allowing a user to deny having completed a certain action. This vulnerability can be abused, by the attacker claiming not to have done an action when he actually did.

To remedy this threat it is important to keep logs on the actions of users.

**Information Disclosure**

The attacker is able to disclose of information normally not available to him.

![Possible Threats (4).png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/5267FCC8-0B65-4C27-9855-543EC545503B/D19730B8-3632-4407-ACB9-33887F177CD0_2/UDPGMe6a2ZOjOzcfLXKQEMJe1ARxGYtrCN2XPHIuVqgz/Possible%20Threats%204.png)

![Possible Threats (6).png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/5267FCC8-0B65-4C27-9855-543EC545503B/DD74E20F-A83A-4187-9C79-196317007ECE_2/qtYsqQWJ3QRRXZxxNOnkAQ673BtAyaK9dRyxZTGIT6Qz/Possible%20Threats%206.png)

**Denial of Service**

The attacker is able to denial service to other users using the Webapp.

![Possible Threats (3).png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/5267FCC8-0B65-4C27-9855-543EC545503B/8111C0B1-9089-4AED-97BA-A55F9F0E97C8_2/3CweaT2QdMa34phdrOHqzMvexOrggA6dxVr0QqewFpAz/Possible%20Threats%203.png)

**Elevation of Privilege**

Means the Attacker acquires higher privileges than he would normally have.

![Possible Threats (2).png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/5267FCC8-0B65-4C27-9855-543EC545503B/45460EE2-5E49-4519-A23C-97BBC56BE12B_2/SSCt8OnbKTt40ZrSE6gOAqQSvybkKp18nLlZUGelvz4z/Possible%20Threats%202.png)

## Graphical Overview

Going more into analyzing the attack technique aspect, I found that making a graphical representation of the app system's architecture, and sketching the different vectors of attack made me find more vulnerabilities.

![Threat Model Fact-Checker Webapp.png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/5267FCC8-0B65-4C27-9855-543EC545503B/E1BAB569-9943-4C41-9BFA-D693CCC1B788_2/RyQXqEvrGFycqVRrx6Y59WQS8tDA2XxhRyFixmpqBDsz/Threat%20Model%20Fact-Checker%20Webapp.png)

## XSS Attack (Example Analysis)

To analyze the vulnerability of an XSS Attack, I created the flow of a user visiting the perpretrators profile.

![Screenshot 2023-11-07 at 13.47.56.png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/5267FCC8-0B65-4C27-9855-543EC545503B/32DBBB19-DB22-42E3-86D3-2E26426A8CD5_2/3Ii7aD1sexn2aroeVid3onPt8IIfkw89gAI0eXdzJ6Qz/Screenshot%202023-11-07%20at%2013.47.56.png)

The graphic assumes the script is already stored in the database, and upon the user viewing the Perpretrators profile page, gets run.

I then analyzed where to create a possible barrier:

![Screenshot 2023-11-07 at 13.48.43.png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/5267FCC8-0B65-4C27-9855-543EC545503B/0CB3A899-E56F-46D9-9867-7A7AEE3DD197_2/jKdALIB3l0TZib51Rc9K8z2fXwXPiiBvY0xPgOIe1Lgz/Screenshot%202023-11-07%20at%2013.48.43.png)

In the first example, validation is used to prevent the perpretrator from inputting code into the input fields.

I then imagine, how the perpretrator could get around this barrier. In the second example I show how the perpretrator could remove the validation function, and execute the request with the malicious code. Then I show how additional validation on the backend could eliminate this vulnerability.

## Implemented Measures

---

Measure: **React XSS Safety Features** Description: React is automatically protected against XSS attacks, as the React DOM will automatically convert anything into a string before rendering it. The only way around this is (as the developer themselves) is to use "dangerouslySetInnerHTML" in a tag, which i don't.

---

Measure: **Authentication** Methods Used:

- Registration/Login via Email and Password: User needs to set email and password to register and login with details
- Creation of JWT Token upon login that is valid for 2 hours
- Secure, HTTP-Only Cookies to store the JWT Token, and prevent XSS Attacks (cookie can't be retrieved per XSS)

Implementation:

```javascript
// Login Function
const token = jwt.sign(
  { user_id: user.id, email: email },
  process.env.JWT_SECRET,
  { expiresIn: "2h" }
);
res.cookie("jwt_token", token, {
  secure: process.env.NODE_ENV !== "development",
  httpOnly: true,
  maxAge: TWO_HOURS_IN_MILLISECONDS,
});
```

```javascript
// Authentication Function
const authenticate = async (req, res, next) => {
  ...
  token = req.cookies.jwt_token;
  ...
  const verification = jwt.verify(token, process.env.JWT_SECRET);
  const userResult = await pool.query(
    `SELECT id, name, email, role, biography FROM "user" WHERE id=${verification.user_id} LIMIT 1;`
  );
  req.user = userResult.rows[0];
  req.role = userResult.rows[0].role;
  ...
};
```

---

Measure: **Authorization**

Methods Used:

- Check for certain roles on frontend, before letting user visit a page
- Check for roles on backend requests using the jwt token stored in the cookie
- The middleware used allows passing the allowed roles for the route in question, and allows setting "allowSelf", which only allows users that have the same id as they pass in req.params.id

Implementation:

```javascript
// Authorization Function
const allowRoles = (allowedRoles, allowSelf) => {
  return (req, res, next) => {
    if (allowSelf && req.params.id == req.user.id) {
      next();
    } else {
      allowedRoles.push("admin");
      if (allowedRoles.includes(req.role)) {
        next();
      } else {
        return res.status(401).send({
          error: `You are not allowed to access this route as ${req.role}`,
        });
      }
    }
  };
};
```

---

Measure: **Brute Force Protection**

Method:

- Enforce Strong Passwords

Implementation:

```javascript
// Method for Checking if a Password contains at least 8 characters,
// and an uppercase letter as well as a special character
export const isPassword = (password: String): boolean => {
  var passwordFormat =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return password !== "" && password.match(passwordFormat) ? true : false;
};
```

Note: This Function is used on frontend and backend to check during registration process.

Other Possible Measures: Using generic error messages to prevent email farming.

---

Measure: **Email Verification**

Method:

- Users are sent an email containing a code which they have to enter in a verification page to verify their email. Only users with verified emails can log in

Implementation:

```javascript
const verificationCode = Math.floor(Math.random() * 100000);
...
const result = await pool.query(
  `INSERT INTO "user" (name, email, password, verification_code, role) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
  [name, email, hashedPassword, verificationCode, "user"]
);
const link = `http://${process.env.ENVIRONMENT_LINK}/users/verify?id=${user.id}&code=${verificationCode}`;
const emailConfirmSendResult = await sendEmail(email, link);
..
```

```javascript
router.get("/verify", async (req, res) => {
    const result = await pool.query(
      `SELECT verification_code FROM "user" WHERE id=${parseInt(req.query.id)};`
    );
    ...
    if (result.rows[0].verification_code == req.query.code) {
      const verificationResult = await pool.query(
        `UPDATE "user" SET verified=true, verification_code=null WHERE id=${parseInt(
          req.query.id
        )};`
...
```

---

Measure: **Password Encryption**

Method:

- Use of Bcrypt to encrypt passwords upon registration

Description: When a user registers, the password is sent to the backend in plain text. This is not a safety issue, as https protocol already encrypts all traffic. The backend then encrypts the password using bcrypt and a salt generated by bcrypt, and then stores it in the database.

Implementation:

```javascript
// During Registration
const hashedPassword = await bcrypt.hash(password, SALTROUNDS);
```

```javascript
// During Login
const passwordMatches = await bcrypt.compare(password, result.rows[0].password);
```

---

Measure: **Rate Limiting**

Method:

- Use of Express Library "express-rate-limit" to limit request's and prevent DDOS/Brute Force

Implementation:

```javascript
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api/", apiLimiter);
```

---

Measure: **Auditing Node Packages**

Method:

- Use of `npm audit` - audit packages frequently to prevent packages containing security vulnerabilities from affecting the system

---

Measure: **Hiding Sensitive Info**

Method:

- Use of .env to hide sensitive information like "JWT Secret", AWS Credentials, Database Credentials and other API Keys

---

Measure: **Sanitization and Validation**

Method:

- Use of "express-validator" package and custom middleware

Prevents

- XSS Attacks
- SQL Injection

Implementation

```javascript
// Middleware validates and escapes all characters which could
// threaten vulnerabilities
...body(["statement", "description", "source"]).exists().isString().escape(),...
```

```javascript
// Implementation of validation middleware as well as own custom validation
// checking function
router.post(
  "/create",
  body(["statement", "description", "source"]).exists().isString().escape(),
  ...
  async (req, res) => {
    try {
      const errors = validationResult(req).errors;
      if (errors.length != 0) {
        console.error(errors);
        return res.status(400).send({
          error: "Some fields seem to have faulty input or don't exist",
        });
      }
      ...
      const claimValid = validateClaimData(statement, description, source);
      if (!claimValid.status) {
        console.error("Invalid Claim Data");
        return res.status(400).send({ error: claimValid.error });
      }
      ...
  }
);
```

```javascript
// Function checks that id is valid and otherwise returns an error message
module.exports = checkValidId = (req, res, next) => {
  if (validationResult(req).errors.length != 0) {
    return res.status(400).send({ message: "Please pass a valid id" });
  } else {
    next();
  }
};
```

```javascript
// Utilization of Custom middleware function for checking the passed id
param("id").exists().escape().isString(),param("id").exists().escape().isString(),
checkValidId,
```

---

Measure: **Strong Passwords when settings up AWS services**

Methods: Use Password generator to generate strong passwords for EC2 Instance, Database etc, and make sure that no keys or passwords are exposed anywhere.

---

Measure: **Strong Security Protocols**

Methods:

- Only allow connection to RDS Database from EC2 Instance itself
- Only open HTTPS port for EC2 hosted Backend (not in testing environment) to provide encrypted communication

---

Measure: **CORS Policy**

Methods:

- Only allow specified origins to make requests

```javascript
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
```

---

Possible Measure: **File Upload Security Measures**

Possible Methods:

- Limit File Type to .png and .jpg
- Limit File size to 5mb
- Limit number of files

---

Measure: **Personal Security**

Methods:

- Use of Password Manager
- Security Procedures for Logging into AWS Account and Password Manager
- Being aware of Phishing
