const Engineer = require("../lib/Engineer");

test("Can set Github account via constructor", () => {
  const testValue = "githubUser";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(e.githubUser).toBe(testValue);
});

test("getRole() should return \"Engineer\"", () => {
  const testValue = "Engineer";
  const e = new Engineer("Foo", 1, "test@test.com", "GithubUser");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "GithubUser";
  const e = new Engineer("Foo", 1, "test@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});
