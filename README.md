# Fact Checker Frontend Documentation

**Table of Contents**

- [Setup](craftdocs://open?blockId=DDD6FD0A-A264-4611-A992-612389F75C73&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Glossary](craftdocs://open?blockId=5FD3F794-9B4B-4C19-AC1C-3A49BD43078E&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Introduction](craftdocs://open?blockId=21B98BAC-F478-44B2-B3C0-170B1F996815&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Infrastructure](craftdocs://open?blockId=5A639987-829D-4686-B087-DF50758C8FC3&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Infrastructure Overviews](craftdocs://open?blockId=A4032458-972F-4357-ABB1-5AAD04F733F7&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Roles](craftdocs://open?blockId=B17987A4-66B8-477F-9971-DE410A2599E2&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Pages](craftdocs://open?blockId=B293E7A2-41FF-4BC1-B633-EAAA5F09FEEE&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Folder Structure](craftdocs://open?blockId=89BDCD57-B3AB-4E01-90C2-801F96749F60&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Testing](craftdocs://open?blockId=DE97EF8C-DDA6-4BB4-8593-886573383783&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Documentation](craftdocs://open?blockId=CD76E92F-1650-4FDB-9CBF-9340B7E0A2BE&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Security Measures](craftdocs://open?blockId=6119F353-5337-4EA1-A745-AF91245BDB42&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [State Management](craftdocs://open?blockId=ADA9C350-B642-4026-BBB0-BF41715DD8F0&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
  - Addition since last Assessment: Dark Mode

Additions since last Assessment

- [Code Structure](craftdocs://open?blockId=FCCE3EE4-3CF7-4686-B1A1-3D33CBF32D8E&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [Performance Optimization](craftdocs://open?blockId=7AA22BC2-480D-4975-B75B-CE40E98B4B4F&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)
- [SEO/Accessibility Optimization](craftdocs://open?blockId=DE2FEF93-9D38-46DA-8B96-E40C5CFAEC82&spaceId=b0e62220-21e7-3e79-e368-d4886dca007e)

## Setup

Prerequisites:

- [Node](https://nodejs.org/en) Installed on system

**Installation**

Create File **.env.local** and add this line:

```javascript
NEXT_PUBLIC_API_URL =
  "http://ec2-18-153-69-44.eu-central-1.compute.amazonaws.com:8080";
```

Install All Packages by executing this command inside the project directory:

```dart
npm i
```

Start Development Server

```dart
npm run dev
```

Then visit the url `http://localhost:3005`

## Glossary

| **Term**  | **Meaning**                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------- |
| Claim     | Information that can be either true or false                                                                              |
| Statement | Commentary on a claim where a user can state their opinion wether a claim is true or false                                |
| Comment   | Same Meaning as Statement                                                                                                 |
| Source    | Information that gives the Claim/Statement/Comment context, referring to where the user has received the information from |

## Introduction

The Fact Checker Web App provides users a platform to find the validity of claims/supposed facts made all around the internet. Users are able to look at Trending claims and are able to see the the answers of other users, and their statements, of why the claim might be false or true.

## Infrastructure

Programming Language: **Typescript** Framework: **NextJS** Linting: **ESLint**

**Notable Libraries:**

- Tailwind for Styling
- Fontawesome for Icons
- Cypress for End-to-End Testing
- React Testing Library for Testing
- Jest for Testing

## Infrastructure Overviews

Following Graph details the interaction of the NextJS App with the backend and the Browser:

![Diagrams for Frontend.png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/B85592C0-D78F-4580-B2A8-DCA6A1A8AC60/0717F82F-F616-45EC-93E7-74AC4430D884_2/6c5CtKfo0l7ptUKx2tF8ayRLAyx4AxryCIlnm7BOdlsz/Diagrams%20for%20Frontend.png)

This additional Graph details the app setup itself, and how the different pages, components, tools used interact with each other:

![Diagrams for Frontend (1).png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/B85592C0-D78F-4580-B2A8-DCA6A1A8AC60/0A0063BF-84A5-46A9-A6A6-5A3CD38E3BE9_2/BRSK5VxZ8A48FDooTOFFDk301XyXN9LenJyf1MMLpk0z/Diagrams%20for%20Frontend%201.png)

## Roles

All Roles also have permissions from roles above.

| **Role**  | **Description**                                                               | **Permissions**                                                                      |
| --------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Anonymous | Anynomous user that doesn't have a role                                       | View Limited Nr. of Pages; Login/Register;                                           |
| User      | User that is logged in and has a valid JWT token stored in a http-only cookie | Create Claims and Statements; View Profile Pages; View Claims Created by Themselves; |
| Admin     | Typically only one admin                                                      | Delete other users Claims and Statements; Delete other users;                        |

## Pages

| **Route**                     | **Description**                                                                                                                | **Required Role** |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| /                             | Shows all verified claims by all Users                                                                                         | \-                |
| /requests                     | Shows all Claims that user which is logged in has submitted                                                                    | User              |
| /create-claim                 | Lets user create a claim themselves                                                                                            | User              |
| /profile                      | Gives user options to change their avatar, biography and password and request account deletion                                 | User              |
| /login                        | Lets Users Login                                                                                                               | \-                |
| /register                     | Lets Users Register                                                                                                            | \-                |
| /logout                       | Lets Users Logout                                                                                                              | User              |
| /view-single-claim/[claim Id] | Page for Viewing a claim and all statements made on it                                                                         | \-                |
| /scores/[user Id]             | Page for Viewing a users contributions, scores, name, avatar and date of joining;<br>Provides ability to send message to user; | User              |
| /scoreboard                   | Page that displays a Scoreboard with the Top 50 Users and their scores                                                         |                   |

## Folder Structure

![Image.png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/B85592C0-D78F-4580-B2A8-DCA6A1A8AC60/5839BDCF-93FE-4C1F-B40D-0DA72BC22E84_2/UItvgCllJ6gaXMWieNgFSWBO6utU4A6WyzPPRLWhY1Uz/Image.png)

| **Folder** | **Contents**                         |
| ---------- | ------------------------------------ |
| assets     | Constants                            |
| components | React Components                     |
| helpers    | Various Helper Functions             |
| hooks      | Custom Hooks for Data Fetching       |
| pages      | Pages and NextJS Proprietary Widgets |
| state      | Context for State Management         |
| styles     | Style Sheets                         |
| types      | Interfaces for Typing                |
| utils      | Various Utility Functions            |

## Testing

Use of **Jest** for Unit and Integration tests. Usage of Mocks to mock Hooks and Databases.

Use of **Cypress** for End-To-End Testing.

## Documentation

TSDoc for Code documentation.

## Security Measures

**Authentication**

Use of Email/Password Registration and Login for receiving token as a cookie. Cookie is then appended to future requests to access resources. Resources on the backend are role-based.

**HTTPS**

Communication with the Backend by HTTPS protocol, to secure End-to-End encryption.

**Backend Measures**

DDOS protection through **Rate Limitin**g.

Server-Side **Validation of Input**s to Prevent SQL Injection.

**CORS Policy**, to only allow website to access resources.

**VPC** for the Database and Backend to prevent unauthorized access.

File Upload Security Measures.

## State Management

Use of `useContext` to access data of currently logged-in user.

```typescript
export interface UserContextType {
  user: User;
  setUser: Function;
}

/**
 * Context containing currently logged in users information
 */
export const UserContext = createContext<UserContextType | null>(null);
```

Use of `useContext` to access darkmode state.

```typescript
export const UserSettingsContext =
  createContext<UserSettingsContextType | null>({
    darkModeActive: false,
    setDarkModeActive: () => {},
  });
```

```typescript
const { darkModeActive } = useContext(UserSettingsContext);
...
<div className={`${darkModeActive ? "text-gray-200" : "text-black"} px-12`}>
```

## Version Control

- Github
- Linear for creating tasks and ticket management

## Code Structure

Separating API calls and other grouped functions into custom hooks:

![Image.png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/B85592C0-D78F-4580-B2A8-DCA6A1A8AC60/438E104A-D5F5-40C5-8DAC-82D1ADC4BE6D_2/rPD4YR3hvmT9q0uAan0k6YDqMyQxtJoVuHhqxQrHquMz/Image.png)

```typescript
export function useFetchClaims(
  initialQuery: ClaimQuery
): [ClaimQuery, Function, Claim[], boolean] {
  const [isLoading, setIsLoading] = useState(true);
  const [claimQuery, setClaimQuery] = useState<ClaimQuery>(initialQuery);
  const [claims, setClaims] = useState<Claim[]>();

  useEffect(() => {
    if (!claimQuery || !claimQuery.category) return;
    setIsLoading(true);
    const queryString: string = constructQueryUrl(claimQuery);
    try {
      fetch(`${API}/${queryString}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((newClaims) => {
          if (claims && claims.length != 0 && claimQuery.skip != 0) {
            setClaims([...claims, ...newClaims]);
          } else {
            setClaims(newClaims);
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [claimQuery]);
  return [claimQuery, setClaimQuery, claims, isLoading];
}
```

```typescript
const initialClaimQuery: ClaimQuery = {
  endpoint: "claims/query",
  limit: 15,
  skip: 0,
  orderBy: SORTING_OPTIONS[0],
  orderByDirection: "DESC",
  category: categories,
  keywords: "",
};
const [claimQuery, setClaimQuery, claims, claimsIsLoading] =
  useFetchClaims(initialClaimQuery);
```

→ Also Use of interfaces for storing query data and mainting only those objects as state instead of breaking it up into multiple states. Then converting those queries into query strings:

```typescript
export const constructQueryUrl = (query: ClaimQuery | UserQuery): string => {
  let queryString = `${query.endpoint}?limit=${query.limit}&skip=${query.skip}&orderBy=${query.orderBy}&orderByDirection=${query.orderByDirection}&`;
  if (!("category" in query)) {
    queryString = cleanTrailingSpecialChars(queryString);
    return queryString;
  }
  queryString += "category=";
  for (let [_, value] of Object.entries(query.category)) {
    const categoryButtonData: ClaimCategoryButtonData = value;
    if (categoryButtonData.active) queryString += `${categoryButtonData.name},`;
  }
  queryString = cleanTrailingSpecialChars(queryString);
  if (query.keywords != "") {
    const keywords = query.keywords.replaceAll(" ", ",");
    queryString += `&keywords=${keywords}`;
  }
  return queryString;
};
```

## Performance Optimizations

Setting correct size values to downsize images when components don't need full size:

```typescript
Image
  priority
  ...
  sizes="(max-width: 900px) 70vw, 33vw"
  ...
/>
```

Use of Cloudfront CDN to cache S3 images for faster retrieval:

![Image.png](https://res.craft.do/user/full/b0e62220-21e7-3e79-e368-d4886dca007e/doc/B85592C0-D78F-4580-B2A8-DCA6A1A8AC60/4B4B9F1C-E1D7-486F-96A6-7A67628FE154_2/YU0nwdx96i0NBPBZxFyocXcsByselJ7BdHdtYsXAW10z/Image.png)

Implementing pagination by loading only specific amount of content and loading more on reaching page bottom (tracked by custom scroll hook):

```typescript
const onBottomReach = async () => {
  if (claims.length < claimQuery.skip + 15) return;
  setClaimQuery({ ...claimQuery, skip: (claimQuery.skip += 15) });
};
const [setTrackedElem] = useScrollTracker(claims, onBottomReach);
useEffect(() => setTrackedElem(document.querySelector("#loading-dots")), []);
```

## SEO/Accessibility Optimizations

Head Tags on every page for storing meta data:

```typescript
<Head>
  <title>Explore Claims with Filters</title>
  <meta
    name="description"
    content="Here you can Filter and Sort through all the submitted Claims"
  />
  <meta name="keywords" content="Truth,Lie,Fake,Claim,Sort" />
</Head>
```

```typescript
<Head>
  <title>{claim.statement}. True or False?</title>
  <meta name="description" content={claim.description} />
</Head>
```

**Better HTML tags:**

- Use of `form` tag's, where `div`'s were previously used
- Use of `<input type="submit" .../`> instead of `button`'s
- Use of `main` and `article` tags to highlight important content
- Use of `<label htmlFor="...">` instead of `p` to properly label `input` fields and `button`'s
- Use of `button` tag where previously `div` tag with `onClick` function were used

**Better Aria tags:**

- Use of `aria-label` where no on-screen label is given
- Use of `aria-description` where a longer description is needed
- Use of `aria-live` to signal Snackbar popups
