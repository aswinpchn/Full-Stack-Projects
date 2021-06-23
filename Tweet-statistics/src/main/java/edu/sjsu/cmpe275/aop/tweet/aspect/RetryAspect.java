package edu.sjsu.cmpe275.aop.tweet.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.aspectj.lang.annotation.Around;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

@Aspect
@Order(1)  // Order means in what order aspect will be processed if more than one aspect applied to the same join point        https://howtodoinjava.com/spring-aop/spring-aop-specifying-aspects-ordering/
public class RetryAspect {
  /***
   * Following is a dummy implementation of this aspect.
   * You are expected to provide an actual implementation based on the requirements, including adding/removing advices as needed.
   * @throws Throwable
   */

  private static int MAX_TRIES = 4; // We want to run four times in case of continous failure (1st time and then 3 failed retires.)

  // This is a use of around advice type. We use this for accomodating IOExceptions that could occur during TweetServiceImpl calls.
  // generally, inside @Around, we call the actual method inside, to take note of changes/ take log. (Using joinPoint.proceed())
  // https://stackoverflow.com/questions/15781322/joinpoint-vs-proceedingjoinpoint-in-aop-using-aspectj
  // https://dzone.com/articles/spring-retry-ways-integrate
  @Around("execution(public void edu.sjsu.cmpe275.aop.tweet.TweetService.*(..))")
  public void dummyAdviceOne(ProceedingJoinPoint joinPoint)
          throws IOException, IllegalArgumentException, UnsupportedOperationException {
    System.out.printf("Prior to the execution of the method %s in RetryAspect \n", joinPoint.getSignature().getName());

    for (int i = 1; i <= MAX_TRIES; i++) {
      try {
        // https://stackoverflow.com/questions/18016503/aspectj-around-and-proceed-with-before-after
        Object a = joinPoint.proceed();
        System.out.println("Seems there is no Network error (IOException)");
        break;
      }
      catch (IOException e) {
        e.printStackTrace();
        System.out.println("  Throttled during try #" + i);
        if(i == 4) {
          System.out.printf("Aborted the executuion of the metohd %s in RetryAspect due to IOException 3 times.\n", joinPoint.getSignature().getName());
          throw new IOException();
        }
      } catch (IllegalArgumentException e) {
        e.printStackTrace();
        System.out.printf("Finished the execution of the method %s in RetryAspect with IllegalArgumentException\n", joinPoint.getSignature().getName());
        throw new IllegalArgumentException();
      } catch(UnsupportedOperationException e) {
        e.printStackTrace();
        System.out.printf("Finished the execution of the method %s in RetryAspect with UnsupportedOperationException\n", joinPoint.getSignature().getName());
        throw new UnsupportedOperationException();
      } catch (Throwable throwable) {
        System.out.println("---------------- Came into throwable -------------------");
        throwable.printStackTrace();
        break;
      }
    }

    System.out.printf("Finished the execution of the method %s in RetryAspect\n", joinPoint.getSignature().getName());
  }

}
