/*
package com.main36.pikcha.global.batch;

import com.main36.pikcha.domain.attraction.entity.Attraction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.JobScope;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class RankingCalcConfiguration {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final EntityManagerFactory entityManagerFactory;

    @Bean
    public Job ExampleJob(){

        Job exampleJob = jobBuilderFactory.get("exampleJob")
                .start()
    }

    @Bean
    @JobScope
    public Step step(*/
/*@Value("#{jobParameters[requestDate]}")String requestDate*//*
){
        return stepBuilderFactory.get("step")
                .<Attraction, Attraction>chunk(10)
                .reader(reader())
    }

    @Bean
    @StepScope
    public JpaPagingItemReader<Attraction> reader(){
        */
/*Map<String, Object> parameterValues = new HashMap<>();
        parameterValues.put("numOfPosts" , 100);*//*


        return new JpaPagingItemReaderBuilder<Attraction>()
                .pageSize(10)
                .queryString("SELECT p FROM ATTRACTION p ORDER BY likes DESC")
                .entityManagerFactory(entityManagerFactory)
                .name("JpaPagingItemREader")
                .build();
    }
    @Bean
    @JobScope
    public Step simpleStep2(@Value("#{jobParameters[requestDate]}")String requestDate){
        return stepBuilderFactory.get("simpleJob")
                .tasklet(((contribution, chunkContext) -> {
                    log.info(">>>> This is step 2");
                    log.info(">>>> requestDate = {}", requestDate);
                    return RepeatStatus.FINISHED;
                }))
                .build();
    }
}
*/
