import React from 'react';
import {Button} from './Button';
 

export const Search= ({value, onChange,children,onSubmit}) =>
<div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
   <form className="input-group mb-3">
   <span className="input-group-text insert-term-tab" id="inputGroup-sizing-default">Insert Search Term</span>
   <input type='text' value={value} onChange={onChange} className="form-control"  />
   <Button onClick={onSubmit} type='submit' className="btn btn-outline-secondary search-button">  {children}  </Button>
   </form>
</div>
