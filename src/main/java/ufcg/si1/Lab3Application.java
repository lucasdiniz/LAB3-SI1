package ufcg.si1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.diagnostics.FailureAnalysis;
import org.springframework.boot.diagnostics.FailureAnalyzer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories("ufcg.si1.repository.TodoDB")
@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
public class Lab3Application {

	public static void main(String[] args) {
		try {
			SpringApplication.run(Lab3Application.class, args);
		}catch(final Exception e){
			FailureAnalyzer analyzer = new FailureAnalyzer() {
				@Override
				public FailureAnalysis analyze(Throwable throwable) {
					return new FailureAnalysis(e.getMessage(), "Server is off...", e);
				}
			};

			analyzer.analyze(e);
		}
	}
}
