import { useEffect } from "react";
import { Layout, Row, Col, Typography, Spin, Empty } from "antd"; // ~ "shared/ui/{...}"
import { useStore } from "effector-react";

import { TasksFilters } from "features/tasks-filters";
import { ToggleTask } from "features/toggle-task";
import { TaskRow, taskModel } from "entities/task";
import styles from "./styles.module.scss";

const TasksListPage = () => {
    const tasks = useStore(taskModel.store.$tasksFiltered);
    const isLoading = useStore(taskModel.store.$loading).tasksList;

    useEffect(() => {
        taskModel.effects.getTasksListFx();
    }, []);

    return (
        <Layout className={styles.root}>
            <Layout className={styles.toolbar}> {/* ~ Layout.Toolbar */}
                <Row justify="center">
                    <Typography.Title level={1}>Tasks List</Typography.Title>
                </Row>
                <Row justify="center">
                    <TasksFilters loading={isLoading} />
                </Row>
            </Layout>
            <Layout.Content className={styles.content}>
                <Row gutter={[0, 20]} justify="center">
                    {isLoading && <Spin size="large" />}
                    {!isLoading && tasks.map((task) => (
                        <Col key={task.id} span={24}>
                            <TaskRow 
                                data={task}
                                titleHref={`/${task.id}`}
                                before={<ToggleTask taskId={task.id} withStatus={false} />}
                            />
                        </Col>
                    ))}
                    {!isLoading && !tasks.length && <Empty description="No tasks found" />}
                </Row>
            </Layout.Content>
        </Layout>
    )
}

export default TasksListPage;
