/**
 * 话术编辑
 */

 import React, { useContext, useState, useEffect, useRef } from 'react';
 import { Table, Input, Button, Popconfirm, Form, InputRef, FormInstance } from 'antd';
 
 import { useCallback } from 'react';
 const EditableContext = React.createContext<FormInstance<any> | null>(null);
 // import type { ColumnsType } from 'antd/lib/table';
 interface Item {
   key: string;
   name: string;
   age: string;
   address: string;
 }
 interface EditableRowProps {
   index: number;
 }
 
 
 const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
   const [form] = Form.useForm();
   return (
     <Form form={form} component={false}>
       <EditableContext.Provider value={form}>
         <tr {...props} />
       </EditableContext.Provider>
     </Form>
   );
 };
 interface EditableCellProps {
   title: React.ReactNode;
   editable: boolean;
   children: React.ReactNode;
   dataIndex: keyof Item;
   record: Item;
   handleSave: (record: Item) => void;
 }
 const EditableCell: React.FC<EditableCellProps> = ({
   title,
   editable,
   children,
   dataIndex,
   record,
   handleSave,
   ...restProps
 }) => {
   const [editing, setEditing] = useState(false);
   const inputRef = useRef<InputRef>(null);
   const form = useContext(EditableContext)!;
 
   useEffect(() => {
     if (editing) {
       inputRef.current!.focus();
     }
   }, [editing]);
 
   const toggleEdit = () => {
     setEditing(!editing);
     form.setFieldsValue({ [dataIndex]: record[dataIndex] });
   };
 
   const save = async () => {
     try {
       const values = await form.validateFields();
 
       toggleEdit();
       handleSave({ ...record, ...values });
     } catch (errInfo) {
       console.log('Save failed:', errInfo);
     }
   };
 
   let childNode = children;
 
   if (editable) {
     childNode = editing ? (
       <Form.Item
         style={{ margin: 0 }}
         name={dataIndex}
         rules={[
           {
             required: true,
             message: `${title} is required.`,
           },
         ]}
       >
         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
       </Form.Item>
     ) : (
       <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
         {children}
       </div>
     );
   }
 
   return <td {...restProps}>{childNode}</td>;
 };
 type EditableTableProps = Parameters<typeof Table>[0];
 interface DataType {
   key: React.Key;
   name: string;
   age: number;
   address: string;
 }
 
 type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
 
 
 const App:React.FC<{}>= ()=>{
   const components = {
     body: {
       row: EditableRow,
       cell: EditableCell,
     },
   };
   type columns = (ColumnTypes[number] & { editable?: boolean; dataIndex: string })
   const [columns,setColumns]=useState<columns[]>([
     {
       title: '话术类型',
       dataIndex: 'name',
       width: '30%',
       editable: true,
     },
     {
       title: '客户反馈',
       dataIndex: 'age',
     },
     {
       title: '客户经理回复',
       dataIndex: 'address',
     },
     {
       title: '操作',
       dataIndex: 'operation',
       render: (_, record:any) =>
         msg.dataSource.length >= 1 ? (
           <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
             <a>Delete</a>
           </Popconfirm>
         ) : null,
     },
   ])
   interface EditableTableState {
     dataSource: DataType[];
     count: number;
   }
 
   const [msg,setMsg] =useState<EditableTableState>(
     {
       dataSource: [
         {
           key: '0',
           name: '开场语',
           age: 32,
           address: 'London, Park Lane no. 0',
         },
         {
           key: '1',
           name: '中间语',
           age: 32,
           address: 'London, Park Lane no. 1',
         },
         {
           key: '1',
           name: '中间语',
           age: 32,
           address: 'London, Park Lane no. 1',
         },
       ],
       count: 2
     }
   )
   const handleDelete =useCallback((key:React.Key) => {
     const dataSource = [...msg.dataSource];
     setMsg(e=>{
       return {
         ...e,
         dataSource: dataSource.filter((item) => item.key !== key)
       }
     });
   },[msg]) 
   const handleAdd = useCallback(() => {
     const { count, dataSource } = msg;
     const newData = {
       key: String(count) ,
       name: `Edward King ${count}`,
       age: 32,
       address: `London, Park Lane no. ${count}`,
     };
     setMsg({
       dataSource: [...dataSource, newData],
       count: count + 1,
     });
   },[msg]) 
   const handleSave = (row:DataType) => {
     const newData = [...msg.dataSource];
     const index = newData.findIndex((item) => row.key === item.key);
     const item = newData[index];
     newData.splice(index, 1, { ...item, ...row });
     setMsg(e=>{
       return {
         ...e,
        dataSource: newData
       }
     })
   }
   useEffect(()=>{
     
     setColumns((e:any)=>{
 
       return e.map((col:columns) => {
         if (col.render){
           col.render=(_:any, record:any) =>
           msg.dataSource.length >= 1 ? (
             <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
               <a>Delete</a>
             </Popconfirm>
           ) : null
         }
         if (!col.editable) {
           return col;
         }
 
         return {
           ...col,
           
           onCell: (record:DataType) => ({
             record,
             editable: col.editable,
             dataIndex: col.dataIndex,
             title: col.title,
             handleSave: handleSave,
           }),
         };
       })
     })
   },[])
   
   return (
     <div>
       <Button
         onClick={handleAdd}
         type="primary"
         style={{
           marginBottom: 16,
         }}
       >
         Add a row
       </Button>
       <Table
         pagination={ false }
         components={components}
         rowClassName={() => 'editable-row'}
         bordered
         dataSource={msg.dataSource}
         columns={columns}
       />
     </div>
   )
 }
 
 export default App