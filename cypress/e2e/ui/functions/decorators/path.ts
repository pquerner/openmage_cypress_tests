import Page from '../../pages/page';

let Path;
export default Path =
  (project, value) =>
  (target: Page, propertyKey: string = null) => {
    if (target.getProject() === project) {
      Object.defineProperty(target, propertyKey, {
        get: function () {
          return value;
        },
        set: function (value) {
          // intentionally empty
        },
      });
    }
  };
