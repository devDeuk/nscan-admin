package com.sktel.nscan.adapters.external.restApi;



import com.sktel.nscan.common.dto.ResponseDTO;
import com.sktel.nscan.domain.sample.dto.SampleDTO;
import com.sktel.nscan.port.service.sample.SampleRedisServie;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value="/api/sample/redis")
public class SampleRedisController {

    private final SampleRedisServie sampleRedisServie;

    @ApiOperation(value = " redis 추가 ", httpMethod = "POST", notes = " Redis 추가 API.")
    @PostMapping
    public ResponseEntity<Object> insertComapnyRedis(@RequestBody SampleDTO sampleDTO){
        sampleRedisServie.addSampleToRedisByRepository(sampleDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "redis 조회", httpMethod = "GET", notes = "redis 조회 API.")
    @GetMapping
    public ResponseEntity<Object> getAllRedis(){
        return new ResponseEntity<>(new ResponseDTO(sampleRedisServie.getSampleAllList()), HttpStatus.OK);
    }

    @ApiOperation(value = "redis 단건 조회", httpMethod = "GET", notes = " Redis 단건 조회 API.")
    @GetMapping(value="/{seq}")
    public ResponseEntity<Object> getSampleFromRedis(@PathVariable String seq){
        return new ResponseEntity<>(new ResponseDTO(sampleRedisServie.getSampleInfoRedisByRepsoitory(seq)), HttpStatus.OK);
    }

    @ApiOperation(value = "redis 단건 삭제", httpMethod = "DELETE", notes = "Redis 삭제 API.")
    @DeleteMapping(value = "/{seq}")
    public ResponseEntity<Object> deleteSampleFromRedis(@PathVariable String seq){
        sampleRedisServie.deleteSampeInfoRedisByRepository(seq);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
