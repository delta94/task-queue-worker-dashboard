import Table, { ColumnProps } from 'antd/lib/table';
import React from 'react';
import { Task, TableProps } from './interface';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { Tag, Space } from 'antd';
import {
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
    StopOutlined
} from '@ant-design/icons';

export const TableComponent = (props: TableProps) => {
    const router = useRouter()
    const columns: Array<ColumnProps<Task>> = [
        {
            dataIndex: 'name',
            key: 'name',
            title: 'Task Name',
        },
        {
            dataIndex: 'total_jobs',
            key: 'total_jobs',
            title: 'Total Jobs',
            render: (total_jobs: number) => {
                return (
                    <div><b>{total_jobs}</b></div>
                );
            }
        },
        {
            dataIndex: 'total_jobs',
            key: 'total_jobs',
            render: (total_jobs: number, row: any) => {
                return (
                    <Space>
                        <Tag icon={<CheckCircleOutlined />} color="green">Success: {row?.detail?.success}</Tag>
                        <Tag icon={<ClockCircleOutlined />} color="default">Queueing: {row?.detail?.queueing}</Tag>
                        <Tag icon={<SyncOutlined spin={row?.detail.retrying != 0} />} color="geekblue">Retrying: {row?.detail?.retrying}</Tag>
                        <Tag icon={<CloseCircleOutlined />} color="red">Failure: {row?.detail?.give_up}</Tag>
                        <Tag icon={<StopOutlined />} color="red">Stopped: {row?.detail?.stopped}</Tag>
                    </Space>
                )
            },
        },
        {
            dataIndex: 'name',
            key: 'action',
            render: (name: string) => {
                return (
                    <Space>
                        <Button type="primary" size="middle" onClick={() => {
                            router.push({
                                pathname: "/task",
                                query: { task_name: name }
                            })
                        }}>
                            View jobs
                            </Button>
                        <Button danger size="middle" onClick={() => {
                            props.cleanJob({ variables: { taskName: name } });
                        }}>
                            Clear Jobs
                            </Button>
                    </Space>
                )
            },
        },

    ];

    const handleOnChange = (pagination: any, filters: any, sorter: any) => {
        const { current, pageSize } = pagination;
        const { field, order } = sorter;

        let orderBy: string = '';
        const sortBy: string = field || props.defaultSort;

        if (!order && props.defaultOrder) {
            orderBy = props.defaultOrder;
        }

        if (order) {
            orderBy = order.replace('end', '');
        }

        props.loadData({
            limit: pageSize,
            orderBy,
            page: current,
            sortBy,
        });
    };

    return (
        <div className="ic-table">
            <Table
                columns={columns}
                dataSource={props.data}
                loading={props.loading}
                onChange={handleOnChange}
                scroll={{ x: 560 }}
            />
        </div>
    );
};

export default TableComponent;