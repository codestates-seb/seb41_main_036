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
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.database.builder.JpaItemWriterBuilder;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class RankingCalcConfiguration {

    private final JobBuilderFactory jobBuilderFactory;
    private final StepBuilderFactory stepBuilderFactory;
    private final EntityManagerFactory entityManagerFactory;
    private long rank = 1;

    @Bean
    public Job CalcJob(){

        Job calcJob = jobBuilderFactory.get("calcJob")
                .start(step())
                .build();
        return calcJob;
    }

    @Bean
    @JobScope
    public Step step(){
        return stepBuilderFactory.get("step")
                .<Attraction, Attraction>chunk(10)
                .reader(reader(null))
                .processor(processor(null))
                .writer(writer(null))
                .build();
    }

    @Bean
    @StepScope
    public JpaPagingItemReader<Attraction> reader(@Value("#{jobParameters[date]}")  String date){

        return new JpaPagingItemReaderBuilder<Attraction>()
                .pageSize(10)
                .queryString("SELECT p FROM Attraction p ORDER BY likes DESC")
                .entityManagerFactory(entityManagerFactory)
                .name("JpaPagingItemReader")
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<Attraction, Attraction> processor(@Value("#{jobParameters[date]}")  String date){
        return new ItemProcessor<Attraction, Attraction>() {
            @Override
            public Attraction process(Attraction attraction) throws Exception {
                long rankChange = attraction.getRank()-rank;
                attraction.setRank(rank);
                attraction.setRankChange(rankChange);
                rank++;
                return attraction;
            }
        };
    }
    @Bean
    @StepScope
    public ItemWriter<Attraction> writer(@Value("#{jobParameters[date]}")  String date){
        return new JpaItemWriterBuilder<Attraction>()
                .entityManagerFactory(entityManagerFactory)
                .build();
        */
/*return new JdbcBatchItemWriterBuilder<Attraction>()
                .dataSource(dataSource)
                .sql("insert into attraction(rank, rankChange")*//*

    }
    */
/*@Bean
    @StepScope
    public Step simpleStep2(@Value("#{jobParameters[requestDate]}")String requestDate){
        return stepBuilderFactory.get("simpleJob")
                .tasklet(((contribution, chunkContext) -> {
                    log.info(">>>> This is step 2");
                    log.info(">>>> requestDate = {}", requestDate);
                    return RepeatStatus.FINISHED;
                }))
                .build();
    }*//*

}
*/
