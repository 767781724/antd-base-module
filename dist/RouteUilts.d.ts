/**
 * 路由工具
 */
export declare const routeUtils: {
    /**
     * url查询字符串转对象
     * @param locationSearch url查询字符串
     * @param defaultValue 默认值，支持对象
     */
    searchStringToObject: (locationSearch: string, defaultValue: any) => any;
    /**
     * 对象转url查询字符串
     * @param queryParams 对象
     */
    objectToSearchString: (queryParams: any) => string;
};
