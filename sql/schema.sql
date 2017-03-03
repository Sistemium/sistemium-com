grant connect to stm;
grant dba to stm;

create Domain WEIGHT as decimal(12,3);
create Domain PRICE4 as decimal(12,4);

util.setUserOption 'asamium.default.domain', 'stm';

-- Types

meta.defineType 'name:STRING';
meta.defineType 'code:MEDIUM';
meta.defineType 'length:INT';
meta.defineType 'src:STRING';
meta.defineType 'date:DATE';
meta.defineType 'count:INT';
meta.defineType 'comment:STRING,,nullable';
meta.defineType 'processing:CODE';

meta.defineType 'isDeleted:BOOL';
meta.defineType 'isValid:BOOL';

-- Entities

meta.defineEntity 'User',
 'name;isDeleted'
;

meta.createTable 'User',
  @forceDrop = 0
;
