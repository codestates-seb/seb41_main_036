package com.main36.pikcha.global.batch;

import lombok.Data;
import org.springframework.batch.core.JobParameters;

@Data
public class JobLaunchRequest {
    private String jobName;
    private JobParameters jobParameters;
}
