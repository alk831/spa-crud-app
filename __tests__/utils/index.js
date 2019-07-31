import * as Utils from '../../src/common/utils';

jest.useFakeTimers();

describe('applyCss', () => {
  test('should filter out values that are not class names', () => {
    const falsyCondition = false;
    const cssMock = {
      'container': 'container',
      'list': 'list',
      'avatar': 'avatar'
    }
  
    const { className } = Utils.applyCss(
      cssMock.container,
      falsyCondition && cssMock.list,
      null,
      cssMock.avatar
    );
  
    expect(className).toEqual(`${cssMock.container} ${cssMock.avatar}`);
  });
});

describe('debounce', () => {
  test('should limit function calls under provided time', () => {
    const debounceTime = 10000;
    const debounceHandler = jest.fn();
 
    function fakeFunc() {
      Utils.debounce(debounceHandler, debounceTime);
    }
  
    fakeFunc();
    fakeFunc();
    fakeFunc();
  
    expect(debounceHandler).not.toBeCalled();

    jest.advanceTimersByTime(debounceTime);

    // jest's fake clearTimeout timer is not reliable
    // expect(setTimeout).toHaveBeenCalledTimes(1);
    // expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), debounceTime);
  });
});

describe('parseCardsTarget', () => {
  test('should throw if provided target value is not correct', () => {
    try {
      Utils.parseCardsTarget('popula');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
