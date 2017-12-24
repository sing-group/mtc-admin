import check from "check-types";

import {stringify} from "query-string";

import flattenObject from "../../utils/flattenObject";

export default class QueryOptions {
  constructor(page, resultsPerPage, sortField, sortOrder, filter) {
    check.assert.maybe.positive(page, "page should be null, undefined or a positive number");
    check.assert.maybe.positive(resultsPerPage, "resultsPerPage should be null, undefined or a positive number");
    check.assert.maybe.nonEmptyString(sortField, "sortField should be null, undefined or a non empty string");
    check.assert.maybe.match(sortOrder, /(ASC|DESC|NONE)/, "sortOrder should be null, undefined or a string with values ASC, DESC or NONE");
    check.assert.maybe.object(filter, "filter should be null, undefined or an object");

    this._page = page || 1;
    this._resultsPerPage = resultsPerPage || 10;
    this._sortField = sortField;
    this._sortOrder = sortOrder || "NONE";
    this._filter = filter;
  }

  static get API_CONTRACT() {
    return {
      sortFieldParameter: "sort",
      sortOrderParameter: "order",
      paginationStartParameter: "start",
      paginationEndParameter: "end"
    };
  }

  static fromAORParams(params, paramNameMapper = param => param) {
    return new QueryOptions(
      params.pagination.page,
      params.pagination.perPage,
      paramNameMapper(params.sort.field),
      params.sort.order,
      params.filter
    );
  }

  get page() {
    return this._page;
  }

  get resultPerPage() {
    return this._resultsPerPage;
  }

  get sortField() {
    return this._sortField;
  }

  get sortOrder() {
    return this._sortOrder;
  }

  get filter() {
    return this._filter;
  }

  buildQuery(addFilter = false) {
    const query = addFilter && check.nonEmptyObject(this._filter)
      ? flattenObject(this._filter)
      : {};

    const api = QueryOptions.API_CONTRACT;

    if (check.assigned(this._sortField)) {
      query[api.sortFieldParameter] = this._sortField;
      query[api.sortOrderParameter] = this._sortOrder;
    }

    query[api.paginationStartParameter] = (this._page - 1) * this._resultsPerPage;
    query[api.paginationEndParameter] = this._page * this._resultsPerPage - 1;

    return stringify(query);
  }

  buildAORQuery() {
    const query = check.nonEmptyObject(this._filter)
      ? {filter: JSON.stringify(this._filter)}
      : {};

    query.page = this._page;
    query.perPage = this._resultsPerPage;
    query.sortField = this._sortField;
    query.original = this._sortOrder;

    return stringify(query);
  }

  appendTo(url) {
    check.assert.nonEmptyString(url, "url should be a non empty string");

    const query = this.buildQuery();

    if (check.emptyString(query)) {
      return url;
    } else if (url.endsWith("?")) {
      return url + query;
    } else {
      return url + "?" + query;
    }
  }
}