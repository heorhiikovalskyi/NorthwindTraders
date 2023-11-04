class ValidationService {
  constructor() {}
  pagination = (offset: number, count: number): boolean => {
    if (offset && count) {
      if (Number.isInteger(offset) && Number.isInteger(count) && offset >= 0 && count > 0) {
        return true;
      }
    }
    return false;
  };

  id = (id: unknown): id is number => {
    if (typeof id === 'number') {
      return true;
    }
    return false;
  };
}

export default ValidationService;
